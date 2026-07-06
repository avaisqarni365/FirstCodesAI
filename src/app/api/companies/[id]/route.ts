import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      contacts: { orderBy: { createdAt: "asc" } },
      _count: { select: { contacts: true, deals: true, emails: true } },
    },
  });

  if (!company) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(company);
}

interface ContactInput {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  source?: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const ownerId = (session.user as { id: string }).id;
  const body = await request.json();
  const { contacts, ...companyData } = body as {
    contacts?: ContactInput[];
    [key: string]: unknown;
  };

  const existing = await prisma.company.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.$transaction(async (tx) => {
    await tx.company.update({
      where: { id },
      data: {
        ...companyData,
        pipelineStage: companyData.pipelineStage as never | undefined,
        customFields: companyData.customFields as never | undefined,
      },
    });

    if (contacts) {
      await tx.contact.deleteMany({ where: { companyId: id } });
      if (contacts.length > 0) {
        await tx.contact.createMany({
          data: contacts.map((c) => ({
            companyId: id,
            firstName: c.firstName,
            lastName: c.lastName,
            email: c.email || null,
            phone: c.phone || null,
            jobTitle: c.jobTitle || null,
            source: c.source || "Companies House",
            status: "LEAD",
            ownerId,
          })),
        });
      }
    }
  });

  const company = await prisma.company.findUnique({
    where: { id },
    include: {
      contacts: { orderBy: { createdAt: "asc" } },
      _count: { select: { contacts: true, deals: true, emails: true } },
    },
  });

  return NextResponse.json(company);
}
