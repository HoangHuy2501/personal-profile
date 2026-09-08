import { NextResponse } from "next/server";
import { listVisits } from "../../../../services/server/VisitorServices";
import { ADMIN_SCOPE_LOCATIONS, readSession } from "../../../../services/server/security";
export const runtime = "nodejs";
function range(request: Request) {
  const url = new URL(request.url);
  const to = new Date(url.searchParams.get("to") || Date.now());
  const from = new Date(
    url.searchParams.get("from") || Date.now() - 30 * 86400000,
  );
  return {
    from: Number.isNaN(from.getTime())
      ? new Date(Date.now() - 30 * 86400000)
      : from,
    to: Number.isNaN(to.getTime()) ? new Date() : to,
  };
}
export async function GET(request: Request) {
  if (!(await readSession(ADMIN_SCOPE_LOCATIONS)))
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401, headers: { "Cache-Control": "private, no-store" } },
    );
  const page = Math.min(
    10000,
    Math.max(1, Number(new URL(request.url).searchParams.get("page") || 1)),
  );
  if (!Number.isInteger(page))
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  try {
    const result = await listVisits(
      range(request).from,
      range(request).to,
      page,
      20,
    );
    return NextResponse.json(
      {
        ...result,
        items: result.items.map((item) => ({
          alias: `ren${item.sequence}`,
          city: item.city,
          region: item.region,
          country: item.country,
          latitude: item.latitude,
          longitude: item.longitude,
          source: item.source,
          locationStatus: item.locationStatus,
          createdAt: item.createdAt.toISOString(),
        })),
      },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "Visits unavailable" }, { status: 503 });
  }
}
