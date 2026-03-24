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

  const callLogs = await prisma.callLog.findMany({
    where,
    orderBy: { startedAt: "desc" },
    take: 50,
  });

  return NextResponse.json(callLogs);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const callLog = await prisma.callLog.create({
    data: {
      ...body,
      userId: (session.user as { id: string }).id,
    },
  });

  return NextResponse.json(callLog, { status: 201 });
}
