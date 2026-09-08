import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

export const ADMIN_SCOPE_REPLY = "feedback:reply" as const;
export const ADMIN_SCOPE_LOCATIONS = "locations:read" as const;
export type AdminScope = typeof ADMIN_SCOPE_REPLY | typeof ADMIN_SCOPE_LOCATIONS;
export function parseAdminScope(value: unknown): AdminScope | null {
  if (value === ADMIN_SCOPE_REPLY) return ADMIN_SCOPE_REPLY;
  if (value === ADMIN_SCOPE_LOCATIONS) return ADMIN_SCOPE_LOCATIONS;
  return null;
}
const COOKIE_PREFIX = "portfolio_admin_session_";
const cookieName = (scope: AdminScope) =>
  `${COOKIE_PREFIX}${scope === ADMIN_SCOPE_REPLY ? "reply" : "locations"}`;

export function randomToken() {
  return crypto.randomBytes(32).toString("base64url");
}
export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
export function sourceKey(source: string, scope: string) {
  const secret = process.env.RATE_LIMIT_SECRET || "missing-secret";
  return crypto
    .createHmac("sha256", secret)
    .update(`${scope}:${source}`)
    .digest("hex");
}

export async function rateLimit(key: string, limit: number, windowMs: number) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + windowMs);
    try {
      return await prisma.$transaction(
        async (tx) => {
          const bucket = await tx.rateLimitBucket.findUnique({
            where: { bucketKey: key },
          });
          if (!bucket || bucket.expiresAt <= now) {
            await tx.rateLimitBucket.upsert({
              where: { bucketKey: key },
              create: { bucketKey: key, count: 1, windowStart: now, expiresAt },
              update: { count: 1, windowStart: now, expiresAt },
            });
            return { allowed: true, retryAfter: Math.ceil(windowMs / 1000) };
          }
          if (bucket.count >= limit)
            return {
              allowed: false,
              retryAfter: Math.max(
                1,
                Math.ceil((bucket.expiresAt.getTime() - now.getTime()) / 1000),
              ),
            };
          await tx.rateLimitBucket.update({
            where: { bucketKey: key },
            data: { count: { increment: 1 } },
          });
          return {
            allowed: true,
            retryAfter: Math.ceil(
              (bucket.expiresAt.getTime() - now.getTime()) / 1000,
            ),
          };
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (error) {
      const code =
        error && typeof error === "object" && "code" in error
          ? error.code
          : undefined;
      if ((code === "P2002" || code === "P2034") && attempt < 2) continue;
      throw error;
    }
  }
  throw new Error("Rate limit transaction failed");
}

export function clientSource(request: Request) {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export function hasValidOrigin(request: Request) {
  if (process.env.NODE_ENV !== "production") return true;
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  try {
    return !!origin && !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function passwordVersion(passwordHash: string) {
  return crypto.createHash("sha256").update(passwordHash).digest("hex");
}
export async function createSession(
  scope: AdminScope,
  passwordHash: string,
  feedbackId?: string,
  ttlMs = 15 * 60 * 1000,
) {
  const token = randomToken();
  await prisma.adminSession.create({
    data: {
      tokenHash: hashToken(token),
      passwordVersion: passwordVersion(passwordHash),
      scope,
      feedbackId,
      expiresAt: new Date(Date.now() + ttlMs),
    },
  });
  return token;
}

export async function readSession(scope: AdminScope, feedbackId?: string) {
  const token = (await cookies()).get(cookieName(scope))?.value;
  if (!token) return null;
  const session = await prisma.adminSession.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  const currentHash = scope === ADMIN_SCOPE_REPLY
    ? process.env.FEEDBACK_REPLY_PASSWORD_HASH || ""
    : process.env.LOCATION_ADMIN_PASSWORD_HASH || "";
  if (
    !session ||
    !currentHash ||
    session.passwordVersion !== passwordVersion(currentHash) ||
    session.scope !== scope ||
    session.revokedAt ||
    session.expiresAt <= new Date()
  )
    return null;
  if (feedbackId && session.feedbackId !== feedbackId) return null;
  return session;
}

export async function setSessionCookie(
  scope: AdminScope,
  token: string,
  maxAge = 900,
) {
  (await cookies()).set(cookieName(scope), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}
export async function revokeCurrentSession(
  scope: AdminScope = ADMIN_SCOPE_LOCATIONS,
) {
  const name = cookieName(scope);
  const token = (await cookies()).get(name)?.value;
  if (token)
    await prisma.adminSession.updateMany({
      where: { tokenHash: hashToken(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  (await cookies()).set(name, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
