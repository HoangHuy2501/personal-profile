import { NextResponse } from "next/server";
import { prisma } from "../../../../../config/database";
import {
  hasValidOrigin,
  readSession,
  ADMIN_SCOPE_REPLY,
} from "../../../../../services/server/security";

export const runtime = "nodejs";
export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!hasValidOrigin(request))
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const { id } = await context.params;
  const session = await readSession(ADMIN_SCOPE_REPLY, id);
  if (!session || session.usedAt)
    return NextResponse.json(
      { error: "Reply permission expired" },
      { status: 401 },
    );
  const body = await request.json().catch(() => ({}));
  const content = typeof body.content === "string" ? body.content.trim() : "";
  if (content.length < 1 || content.length > 2000)
    return NextResponse.json(
      { error: "Reply must be 1-2000 characters" },
      { status: 400 },
    );
  try {
    const reply = await prisma.$transaction(async (tx) => {
      const claimed = await tx.adminSession.updateMany({
        where: {
          id: session.id,
          usedAt: null,
          revokedAt: null,
          expiresAt: { gt: new Date() },
        },
        data: { usedAt: new Date() },
      });
      if (claimed.count !== 1) throw new Error("grant-used");
      return tx.feedbackReply.create({ data: { feedbackId: id, content } });
    });
    return NextResponse.json(
      {
        id: reply.id,
        createdAt: reply.createdAt.toISOString(),
        author: "Nguyễn Hoàng Huy · Chủ website",
      },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error && error.message === "grant-used"
            ? "Reply permission expired"
            : "Could not save reply",
      },
      { status: 409 },
    );
  }
}
