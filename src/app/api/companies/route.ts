import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || "";
  const stage = searchParams.get("stage") || "";
  const registrationNumbers = searchParams.get("registrationNumbers") || "";

  const regList = registrationNumbers
    ? registrationNumbers.split(",").map((n) => n.trim()).filter(Boolean)
    : [];

  const where = {
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { industry: { contains: search, mode: "insensitive" as const } },
        { registrationNumber: { contains: search, mode: "insensitive" as const } },
      ],
    }),
    ...(stage && { pipelineStage: stage as never }),
    ...(regList.length > 0 && { registrationNumber: { in: regList } }),
  };

  const companies = await prisma.company.findMany({
    where,
    include: {
      contacts: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          jobTitle: true,
          status: true,
        },
        orderBy: { createdAt: "asc" },
      },
      _count: { select: { contacts: true, deals: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(companies);
}

interface ContactInput {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  source?: string;
}

interface CompanyCreateBody {
  name: string;
  registrationNumber?: string;
  website?: string;
  industry?: string;
  size?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  linkedinUrl?: string;
  description?: string;
  source?: string;
  pipelineStage?: string;
  tags?: string[];
  customFields?: Record<string, unknown>;
  contacts?: ContactInput[];
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: CompanyCreateBody = await request.json();
  const ownerId = (session.user as { id: string }).id;

  if (body.registrationNumber) {
    const existing = await prisma.company.findFirst({
      where: { registrationNumber: body.registrationNumber },
      include: {
        contacts: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            jobTitle: true,
            status: true,
          },
        },
      },
    });
    if (existing) {
      return NextResponse.json({ ...existing, alreadyExists: true });
    }
  }

  const { contacts, ...companyData } = body;

  const company = await prisma.company.create({
    data: {
      ...companyData,
      pipelineStage: (companyData.pipelineStage as never) || "IDENTIFIED",
      tags: companyData.tags || [],
      customFields: (companyData.customFields as Prisma.InputJsonValue) || undefined,
      contacts: contacts?.length
        ? {
            create: contacts.map((c) => ({
              firstName: c.firstName,
              lastName: c.lastName,
              email: c.email || null,
              phone: c.phone || null,
              jobTitle: c.jobTitle || null,
              source: c.source || "Companies House",
              status: "LEAD",
              ownerId,
            })),
          }
        : undefined,
    },
    include: {
      contacts: true,
      _count: { select: { contacts: true, deals: true } },
    },
  });

  return NextResponse.json(company, { status: 201 });
}
