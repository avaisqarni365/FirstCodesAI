import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const stage = searchParams.get("stage") || "";

  const where = {
    ...(stage && { stage: stage as never }),
  };

  const deals = await prisma.deal.findMany({
    where,
    include: {
      contact: { select: { firstName: true, lastName: true } },
      company: { select: { name: true } },
      owner: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(deals);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const deal = await prisma.deal.create({
    data: {
      ...body,
      ownerId: (session.user as { id: string }).id,
    },
  });

  return NextResponse.json(deal, { status: 201 });
}
