import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const stage = searchParams.get("stage") || "";

  const where = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { industry: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(stage && { pipelineStage: stage as never }),
  };

  const companies = await prisma.company.findMany({
    where,
    include: { _count: { select: { contacts: true, deals: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(companies);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const company = await prisma.company.create({ data: body });
  return NextResponse.json(company, { status: 201 });
}
