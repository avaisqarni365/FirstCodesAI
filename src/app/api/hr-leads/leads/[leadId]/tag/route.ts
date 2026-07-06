import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getDailyTagQuota } from "@/lib/daily-quota";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ leadId: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const { leadId } = await params;
  const quota = await getDailyTagQuota(userId);

  if (quota.remaining <= 0) {
    return NextResponse.json(
      { error: `Daily limit reached (${quota.limit} companies per day). Try again tomorrow.` },
      { status: 429 }
    );
  }

  const lead = await prisma.profileCompanyLead.findUnique({
    where: { id: leadId },
    include: { profile: true },
  });

  if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  if (lead.status === "TAGGED") {
    return NextResponse.json({ error: "Already tagged" }, { status: 400 });
  }

  const body = await request.json().catch(() => ({}));
  const pipelineStage = body.pipelineStage || "IDENTIFIED";

  let companyId = lead.companyId;

  if (!companyId) {
    const existing = await prisma.company.findFirst({
      where: { name: { equals: lead.companyName, mode: "insensitive" } },
    });

    if (existing) {
      companyId = existing.id;
      await prisma.company.update({
        where: { id: existing.id },
        data: {
          website: lead.website || existing.website,
          pipelineStage: pipelineStage as never,
          tags: { set: [...new Set([...existing.tags, `region:${lead.region}`, "profile-intel"])] },
          customFields: {
            ...(typeof existing.customFields === "object" && existing.customFields ? existing.customFields : {}),
            careersUrl: lead.careersUrl,
            jobListings: lead.jobListings,
            sourceProfile: lead.profile.personName,
          },
        },
      });
    } else {
      const company = await prisma.company.create({
        data: {
          name: lead.companyName,
          website: lead.website,
          industry: "Technology",
          city: lead.location,
          country: lead.region === "UK" ? "UK" : lead.region,
          source: "Profile Intelligence",
          pipelineStage: pipelineStage as never,
          tags: [`region:${lead.region}`, "profile-intel"],
          customFields: {
            careersUrl: lead.careersUrl,
            jobListings: lead.jobListings,
            sourceProfile: lead.profile.personName,
            role: lead.role,
          },
        },
      });
      companyId = company.id;
    }
  }

  const updated = await prisma.profileCompanyLead.update({
    where: { id: leadId },
    data: {
      status: "TAGGED",
      taggedAt: new Date(),
      taggedByUserId: userId,
      companyId,
      pipelineStage: pipelineStage as never,
    },
  });

  const newQuota = await getDailyTagQuota(userId);
  return NextResponse.json({ lead: updated, companyId, quota: newQuota });
}
