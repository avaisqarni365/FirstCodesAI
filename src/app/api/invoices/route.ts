import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get("status") || "";

  const where = {
    ...(status && { status: status as never }),
  };

  const invoices = await prisma.invoice.findMany({
    where,
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(invoices);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items, ...invoiceData } = await request.json();

  const invoice = await prisma.invoice.create({
    data: {
      ...invoiceData,
      userId: (session.user as { id: string }).id,
      items: {
        create: items,
      },
    },
    include: { items: true },
  });

  return NextResponse.json(invoice, { status: 201 });
}
