import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") || "";
  if (!query || query.length < 2) {
    return NextResponse.json({ items: [] });
  }

  const apiKey = process.env.COMPANIES_HOUSE_API_KEY;

  // If no API key, use the free Companies House search
  const url = `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(query)}&items_per_page=20`;

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
