import { NextResponse } from "next/server";
import { ADMIN_SCOPE_LOCATIONS, hasValidOrigin, revokeCurrentSession } from "../../../../services/server/security";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!hasValidOrigin(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  await revokeCurrentSession(ADMIN_SCOPE_LOCATIONS);
  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
