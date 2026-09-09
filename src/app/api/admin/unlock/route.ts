import { NextResponse } from "next/server";
import { verifyPassword } from "../../../../services/server/password";
import {
  ADMIN_SCOPE_LOCATIONS,
  ADMIN_SCOPE_REPLY,
  clientSource,
  createSession,
  hasValidOrigin,
  parseAdminScope,
  rateLimit,
  setSessionCookie,
  sourceKey,
} from "../../../../services/server/security";

export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!hasValidOrigin(request))
    return NextResponse.json({ error: "Invalid origin", code: "invalid_origin" }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const scope = parseAdminScope(body?.scope);
  const password = typeof body?.password === "string" ? body.password : "";
  const feedbackId =
    typeof body?.feedbackId === "string" ? body.feedbackId : undefined;
  if (!scope || !password || (scope === ADMIN_SCOPE_REPLY && !feedbackId))
    return NextResponse.json({ error: "Invalid request", code: "invalid_request" }, { status: 400 });
  if (!process.env.RATE_LIMIT_SECRET)
    return NextResponse.json(
      { error: "Server security is not configured", code: "security_not_configured" },
      { status: 503 },
    );
  let limits;
  try {
    limits = await Promise.all([
      rateLimit(sourceKey(clientSource(request), scope), 5, 15 * 60 * 1000),
      rateLimit(sourceKey("global", scope), 50, 15 * 60 * 1000),
    ]);
  } catch {
    return NextResponse.json(
      { error: "Authentication service is temporarily unavailable", code: "auth_unavailable" },
      { status: 503 },
    );
  }
  if (!limits[0].allowed || !limits[1].allowed)
    return NextResponse.json(
      { error: "Too many attempts", code: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(limits[0].retryAfter, limits[1].retryAfter),
          ),
        },
      },
    );
  const hash =
    scope === ADMIN_SCOPE_REPLY
      ? process.env.FEEDBACK_REPLY_PASSWORD_HASH || ""
      : process.env.LOCATION_ADMIN_PASSWORD_HASH || "";
      
  if (!hash)
    return NextResponse.json(
      { error: "Password hash is not configured for this scope", code: "password_not_configured" },
      { status: 503 },
    );
  if (!(await verifyPassword(password, hash)))
    return NextResponse.json({ error: "Incorrect password", code: "incorrect_password" }, { status: 401 });
  const token = await createSession(
    scope,
    hash,
    feedbackId,
    scope === ADMIN_SCOPE_LOCATIONS ? 15 * 60 * 1000 : 10 * 60 * 1000,
  );
  await setSessionCookie(
    scope,
    token,
    scope === ADMIN_SCOPE_LOCATIONS ? 900 : 600,
  );
  return NextResponse.json(
    { ok: true, scope },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
