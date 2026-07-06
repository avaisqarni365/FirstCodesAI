import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  companiesHouseHeaders,
  formatAddress,
  getCompaniesHouseApiKey,
  type CompaniesHouseAddress,
  type CompanySearchResult,
} from "@/lib/companies-house";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;

const API_KEY_HELP =
  "Companies House API key is not configured. Add COMPANIES_HOUSE_API_KEY to your .env file (free at developer.company-information.service.gov.uk).";

function checkRateLimit(userId: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(userId);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(userId, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

function mapSearchItem(company: {
  title?: string;
  company_name?: string;
  company_number?: string;
  company_status?: string;
  company_type?: string;
  type?: string;
  date_of_creation?: string;
  registered_office_address?: CompaniesHouseAddress;
  description?: string;
  sic_codes?: string[];
}): CompanySearchResult {
  const addr = company.registered_office_address;
  return {
    name: company.title || company.company_name || "",
    registrationNumber: company.company_number || "",
    status: company.company_status || "unknown",
    type: (company.company_type || company.type || "").replace(/-/g, " "),
    dateOfCreation: company.date_of_creation || "",
    address: formatAddress(addr),
    city: addr?.locality || "",
    postalCode: addr?.postal_code || "",
    country: addr?.country || "United Kingdom",
    description: company.description || "",
    sicCodes: company.sic_codes || [],
  };
}

function filterByStatus(items: CompanySearchResult[], status: string): CompanySearchResult[] {
  if (!status) return items;
  return items.filter((c) => c.status.toLowerCase() === status.toLowerCase());
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  if (!checkRateLimit(userId)) {
    return NextResponse.json({ error: "Too many requests. Please wait." }, { status: 429 });
  }

  const apiKey = getCompaniesHouseApiKey();
  if (!apiKey) {
    return NextResponse.json({ error: API_KEY_HELP, items: [], total: 0 }, { status: 503 });
  }

  const params = request.nextUrl.searchParams;
  const query = (params.get("q") || "").trim();
  const status = params.get("status") || "";
  const sic = params.get("sic") || "";
  const location = (params.get("location") || "").trim();
  const mode = params.get("mode") || "standard";
  const page = Math.max(0, parseInt(params.get("page") || "0", 10));
  const pageSize = Math.min(50, Math.max(10, parseInt(params.get("size") || "25", 10)));

  if (!query && !sic && !location) {
    return NextResponse.json({ items: [], total: 0 });
  }

  const headers = companiesHouseHeaders(apiKey);
  const useAdvanced = mode === "advanced" || Boolean(sic || location);

  try {
    if (useAdvanced) {
      const searchParams = new URLSearchParams();
      if (query) {
        if (/^\d{6,8}$/.test(query)) {
          searchParams.set("company_number", query);
        } else {
          searchParams.set("company_name_includes", query.slice(0, 200));
        }
      }
      if (status) searchParams.set("company_status", status);
      if (sic) searchParams.set("sic_codes", sic);
      if (location) searchParams.set("location", location.slice(0, 100));
      searchParams.set("size", String(pageSize));
      searchParams.set("start_index", String(page * pageSize));

      const url = `https://api.company-information.service.gov.uk/advanced-search/companies?${searchParams}`;
      const response = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        console.error("Companies House advanced search failed:", response.status, body);
        return NextResponse.json(
          {
            error: `Companies House search failed (${response.status}). Check your API key and try again.`,
            items: [],
            total: 0,
            page,
            pageSize,
          },
          { status: 502 }
        );
      }

      const data = await response.json();
      const items = (data.items || []).map(mapSearchItem);
      const total = data.hits ?? items.length;

      return NextResponse.json({ items, total, page, pageSize, sic: sic || null });
    }

    if (!query || query.length < 2) {
      return NextResponse.json({ items: [], total: 0 });
    }

    const url = `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(query.slice(0, 200))}&items_per_page=${pageSize}`;
    const response = await fetch(url, { headers, signal: AbortSignal.timeout(15000) });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error("Companies House search failed:", response.status, body);
      return NextResponse.json(
        {
          error: `Companies House search failed (${response.status}). Check your API key and try again.`,
          items: [],
          total: 0,
        },
        { status: 502 }
      );
    }

    const data = await response.json();
    let items: CompanySearchResult[] = (data.items || []).map(mapSearchItem);
    items = filterByStatus(items, status);
    if (sic) {
      items = items.filter((c) => c.sicCodes.includes(sic));
    }

    return NextResponse.json({ items, total: data.total_results || items.length });
  } catch (err) {
    console.error("Companies House search error:", err);
    return NextResponse.json(
      { error: "Could not reach Companies House. Please try again.", items: [], total: 0 },
      { status: 502 }
    );
  }
}
