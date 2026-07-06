import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import {
  extractHeadline,
  extractPersonName,
  parseProfileExperiences,
  type RegionCode,
} from "@/lib/profile-parser";
import { enrichCompany } from "@/lib/web-enrichment";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const body = await request.json();
  const rawProfile = (body.rawProfile || "").trim();
  const region = (body.region || "UK") as RegionCode;
  const personName = (body.personName || extractPersonName(rawProfile)).trim();
  const linkedinUrl = body.linkedinUrl || "";
  const headline = body.headline || extractHeadline(rawProfile);

  if (!rawProfile || rawProfile.length < 20) {
    return NextResponse.json({ error: "Profile text is too short" }, { status: 400 });
  }

  const experiences = parseProfileExperiences(rawProfile);
  if (!experiences.length) {
    return NextResponse.json(
      { error: "No work experience found. Paste a LinkedIn profile or JSON experience list." },
      { status: 400 }
    );
  }

  const profile = await prisma.personProfile.create({
    data: {
      personName,
      linkedinUrl: linkedinUrl || null,
      headline: headline || null,
      region,
      rawProfile,
      userId,
      leads: {
        create: experiences.map((exp) => ({
          companyName: exp.companyName,
          role: exp.role || null,
          duration: exp.duration || null,
          location: exp.location || null,
          region,
          status: "PENDING",
        })),
      },
    },
    include: { leads: true },
  });

  // Enrich in background (sequential to avoid rate limits)
  enrichLeadsAsync(profile.id, region).catch(() => {});

  return NextResponse.json(profile, { status: 201 });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const profiles = await prisma.personProfile.findMany({
    where: { userId },
    include: {
      leads: { orderBy: { createdAt: "asc" } },
      _count: { select: { leads: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json(profiles);
}

async function enrichLeadsAsync(profileId: string, region: RegionCode) {
  const leads = await prisma.profileCompanyLead.findMany({
    where: { profileId, status: "PENDING" },
  });

  for (const lead of leads) {
    await prisma.profileCompanyLead.update({
      where: { id: lead.id },
      data: { status: "ENRICHING" },
    });

    try {
      const result = await enrichCompany(lead.companyName, region);
      await prisma.profileCompanyLead.update({
        where: { id: lead.id },
        data: {
          website: result.website || null,
          careersUrl: result.careersUrl || null,
          jobListings: result.jobListings as unknown as Prisma.InputJsonValue,
          searchQuery: result.searchQuery,
          status: "ENRICHED",
        },
      });
    } catch {
      await prisma.profileCompanyLead.update({
        where: { id: lead.id },
        data: { status: "FAILED" },
      });
    }
  }
}
