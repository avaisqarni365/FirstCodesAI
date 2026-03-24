import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const direction = searchParams.get("direction") || "";
  const status = searchParams.get("status") || "";

  const where = {
    userId: (session.user as { id: string }).id,
    ...(direction && { direction: direction as "INBOUND" | "OUTBOUND" }),
    ...(status && { status: status as never }),
  };

  const emails = await prisma.email.findMany({
    where,
    include: {
      contact: { select: { firstName: true, lastName: true } },
      company: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(emails);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const email = await prisma.email.create({
    data: {
      ...body,
      userId: (session.user as { id: string }).id,
    },
  });

  return NextResponse.json(email, { status: 201 });
}
