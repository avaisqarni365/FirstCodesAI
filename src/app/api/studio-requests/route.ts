import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

/**
 * POST /api/studio-requests — PUBLIC. A SparkVibe Studio visitor submits a build
 * request (requirements, chosen features, estimate). No auth required.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const requirements = (body.requirements || "").toString().slice(0, 5000).trim();

    if (!requirements) {
      return NextResponse.json({ error: "Requirements are required." }, { status: 400 });
    }

    const created = await prisma.projectRequest.create({
      data: {
        name: body.name ? String(body.name).slice(0, 200) : null,
        email: body.email ? String(body.email).slice(0, 200) : null,
        company: body.company ? String(body.company).slice(0, 200) : null,
        requirements,
        features: (Array.isArray(body.features) ? body.features : []) as unknown as Prisma.InputJsonValue,
        complexity: String(body.complexity || "standard").slice(0, 40),
        estTokens: Number.isFinite(body.estTokens) ? Math.round(body.estTokens) : 0,
        estPrice: Number.isFinite(body.estPrice) ? Math.round(body.estPrice) : 0,
        estSprints: Number.isFinite(body.estSprints) ? Math.round(body.estSprints) : 0,
        estWeeks: Number.isFinite(body.estWeeks) ? Math.round(body.estWeeks) : 0,
        source: "studio",
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
  } catch (err) {
    console.error("studio-request create failed:", err);
    return NextResponse.json({ error: "Could not submit your request. Please try again." }, { status: 500 });
  }
}

/**
 * GET /api/studio-requests — ADMIN. Lists build requests, optional ?status= filter.
 */
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const status = request.nextUrl.searchParams.get("status") || "";
  const requests = await prisma.projectRequest.findMany({
    where: { ...(status && { status: status as never }) },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(requests);
}
