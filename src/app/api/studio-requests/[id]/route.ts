import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const VALID_STATUS = ["NEW", "REVIEWING", "QUOTED", "IN_BUILD", "DELIVERED", "DECLINED"];

/** PATCH /api/studio-requests/:id — ADMIN. Update status and/or internal notes. */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const data: { status?: never; notes?: string } = {};
  if (body.status) {
    if (!VALID_STATUS.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    data.status = body.status as never;
  }
  if (typeof body.notes === "string") data.notes = body.notes.slice(0, 5000);

  const updated = await prisma.projectRequest.update({ where: { id }, data });
  return NextResponse.json(updated);
}

/** DELETE /api/studio-requests/:id — ADMIN. */
export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  await prisma.projectRequest.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
