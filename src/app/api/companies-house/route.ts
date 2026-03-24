import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Rate limiting note:
 * The Companies House API has its own rate limits (600 requests per 5 minutes).
 * For production, consider implementing server-side rate limiting per user
 * using a solution like Redis + sliding window counters to prevent abuse
 * and protect the API key quota.
 *
 * Example approach:
 * - Track requests per userId in Redis with TTL
 * - Limit to ~30 requests per minute per user
 * - Return 429 Too Many Requests when exceeded
 */

// Simple in-memory rate limiter (per-user, resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // max requests per window

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  entry.count++;
  return true;
}

export async function GET(request: NextRequest) {
  // Require authentication to prevent unauthenticated abuse of API key
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;

  // Check rate limit
  if (!checkRateLimit(userId)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before searching again." },
      { status: 429 }
    );
  }

  const query = (request.nextUrl.searchParams.get("q") || "").trim();
  if (!query || query.length < 2) {
    return NextResponse.json({ items: [] });
  }

  // Cap query length to prevent abuse
  const sanitizedQuery = query.slice(0, 200);

  const apiKey = process.env.COMPANIES_HOUSE_API_KEY;

  const url = `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(sanitizedQuery)}&items_per_page=20`;

  try {
    const headers: Record<string, string> = {
      "Accept": "application/json",
    };

    if (apiKey) {
      headers["Authorization"] = `Basic ${Buffer.from(apiKey + ":").toString("base64")}`;
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      // Fallback: return empty results if API key is missing or invalid
      return NextResponse.json({ items: [], total: 0 });
    }

    const data = await response.json();

    const items = (data.items || []).map((company: {
      title?: string;
      company_number?: string;
      company_status?: string;
      company_type?: string;
      date_of_creation?: string;
      registered_office_address?: {
        address_line_1?: string;
        address_line_2?: string;
        locality?: string;
        postal_code?: string;
        region?: string;
        country?: string;
      };
      description?: string;
    }) => ({
      name: company.title || "",
      registrationNumber: company.company_number || "",
      status: company.company_status || "unknown",
      type: company.company_type || "",
      dateOfCreation: company.date_of_creation || "",
      address: [
        company.registered_office_address?.address_line_1,
        company.registered_office_address?.address_line_2,
        company.registered_office_address?.locality,
        company.registered_office_address?.postal_code,
      ].filter(Boolean).join(", "),
      city: company.registered_office_address?.locality || "",
      country: company.registered_office_address?.country || "United Kingdom",
      description: company.description || "",
    }));

    return NextResponse.json({ items, total: data.total_results || items.length });
  } catch {
    return NextResponse.json({ items: [], total: 0 });
  }
}
