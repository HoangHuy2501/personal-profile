import { NextResponse } from "next/server";
import { visitStats } from "../../../../services/server/VisitorServices";
import { ADMIN_SCOPE_LOCATIONS, readSession } from "../../../../services/server/security";
export const runtime = "nodejs";
export async function GET(request: Request) {
  if (!(await readSession(ADMIN_SCOPE_LOCATIONS)))
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401, headers: { "Cache-Control": "private, no-store" } },
    );
  const url = new URL(request.url);
  const to = new Date(url.searchParams.get("to") || Date.now());
  const from = new Date(
    url.searchParams.get("from") || Date.now() - 30 * 86400000,
  );
  if (
    Number.isNaN(from.getTime()) ||
    Number.isNaN(to.getTime()) ||
    to < from ||
    to.getTime() - from.getTime() > 366 * 86400000
  )
    return NextResponse.json({ error: "Invalid date range" }, { status: 400 });
  try {
    return NextResponse.json(await visitStats(from, to), {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Stats unavailable" }, { status: 503 });
  }
}
