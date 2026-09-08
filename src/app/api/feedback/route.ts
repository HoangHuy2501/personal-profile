import { NextResponse } from "next/server";
import {
  createFeedback,
  findFeedbackByIdempotencyKey,
  listFeedback,
} from "../../../services/server/FeedbackServices";
import {
  clientSource,
  hasValidOrigin,
  rateLimit,
  sourceKey,
} from "../../../services/server/security";

export const runtime = "nodejs";
const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status });

export async function GET(request: Request) {
  const page = Number(new URL(request.url).searchParams.get("page") || 1);
  if (!Number.isInteger(page) || page < 1 || page > 10000)
    return json({ error: "Invalid page" }, 400);
  try {
    const result = await listFeedback(page, 10);
    return json({
      ...result,
      items: result.items.map((item) => ({
        id: item.id,
        displayName: item.displayName,
        content: item.content,
        createdAt: item.createdAt.toISOString(),
        replies: item.replies.map((reply) => ({
          id: reply.id,
          content: reply.content,
          createdAt: reply.createdAt.toISOString(),
          author: "Nguyễn Hoàng Huy · Chủ website",
        })),
      })),
    });
  } catch {
    return json({ error: "Feedback is temporarily unavailable" }, 503);
  }
}

export async function POST(request: Request) {
  if (!hasValidOrigin(request)) return json({ error: "Invalid origin" }, 403);
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 12000) return json({ error: 'Payload too large' }, 413);
  let limit;
  try {
    limit = await rateLimit(
      sourceKey(clientSource(request), "feedback"),
      8,
      15 * 60 * 1000,
    );
  } catch {
    return json({ error: "Feedback is temporarily unavailable" }, 503);
  }
  if (!limit.allowed)
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  let body: {
    displayName?: unknown;
    content?: unknown;
    idempotencyKey?: unknown;
    website?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  if (body.website) return json({ ok: true }, 201);
  const displayName =
    typeof body.displayName === "string" ? body.displayName.trim() : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";
  const key =
    typeof body.idempotencyKey === "string" ? body.idempotencyKey.trim() : "";
  if (displayName.length > 60)
    return json({ error: "Display name must be 60 characters or fewer" }, 400);
  if (content.length < 10 || content.length > 2000)
    return json({ error: "Feedback must be 10-2000 characters" }, 400);
  if (!/^[A-Za-z0-9_-]{16,100}$/.test(key))
    return json({ error: "Invalid idempotency key" }, 400);
  try {
    const existing = await findFeedbackByIdempotencyKey(key);
    if (existing) return json({ id: existing.id, duplicate: true }, 200);
    const created = await createFeedback(displayName, content, key);
    return json(
      { id: created.id, createdAt: created.createdAt.toISOString() },
      201,
    );
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      const existing = await findFeedbackByIdempotencyKey(key);
      if (existing) return json({ id: existing.id, duplicate: true }, 200);
    }
    return json({ error: "Could not save feedback" }, 503);
  }
}
