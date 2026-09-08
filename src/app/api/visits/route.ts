import { geolocation, ipAddress } from "@vercel/functions";
import { NextResponse } from "next/server";
import { createVisit } from "../../../services/server/VisitorServices";
import {
  clientSource,
  hasValidOrigin,
  rateLimit,
  sourceKey,
} from "../../../services/server/security";

export const runtime = "nodejs";
function coordinate(value: unknown, min: number, max: number) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) && number >= min && number <= max
    ? number
    : undefined;
}
export async function POST(request: Request) {
  if (!hasValidOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 1000) return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  if (process.env.VISITOR_TRACKING_ENABLED !== "true")
    return NextResponse.json({ disabled: true }, { status: 404 });
  if (!process.env.RATE_LIMIT_SECRET)
    return NextResponse.json({ error: "Server security is not configured" }, { status: 503 });
  let limit;
  try {
    limit = await rateLimit(
      sourceKey(clientSource(request), "visits"),
      3,
      60 * 60 * 1000,
    );
  } catch {
    return NextResponse.json({ error: "Visit service is temporarily unavailable" }, { status: 503 });
  }
  if (!limit.allowed)
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  const body = await request.json().catch(() => ({}));
  const key =
    typeof body.idempotencyKey === "string" ? body.idempotencyKey.trim() : "";
  const noticeVersion =
    typeof body.noticeVersion === "string"
      ? body.noticeVersion.slice(0, 30)
      : "";
  if (!/^[A-Za-z0-9_-]{16,100}$/.test(key) || !noticeVersion)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  try {
    // Vercel's signed platform headers are the only location input; malformed
    // headers fall back to an unknown visit instead of producing a 500.
    const geo = geolocation(request);
    const latitude = coordinate(geo.latitude, -90, 90);
    const longitude = coordinate(geo.longitude, -180, 180);
    const city = geo.city?.slice(0, 100) || undefined;
    const region = geo.countryRegion?.slice(0, 100) || undefined;
    const country = geo.country?.slice(0, 100) || undefined;
    const locationStatus = latitude !== undefined && longitude !== undefined ? "located" : city || region || country ? "partial" : "unknown";
    await createVisit({
      idempotencyKey: key,
      noticeVersion,
      retentionDays: (() => { const value = Number(process.env.VISITOR_RETENTION_DAYS); return Number.isFinite(value) && value > 0 ? Math.floor(value) : 30; })(),
      location: {
        city,
        region,
        country,
        latitude,
        longitude,
        source: ipAddress(request) ? "vercel-geo" : "unknown",
        locationStatus,
        accuracy: latitude !== undefined ? "regional" : undefined,
      },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    )
      return NextResponse.json({ ok: true, duplicate: true });
    return NextResponse.json(
      { error: "Could not record visit" },
      { status: 503 },
    );
  }
}
