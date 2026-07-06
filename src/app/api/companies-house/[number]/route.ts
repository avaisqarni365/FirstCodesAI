import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import {
  companiesHouseHeaders,
  formatAddress,
  getCompaniesHouseApiKey,
  type CompanyOfficer,
  type CompanyProfile,
} from "@/lib/companies-house";
import { SIC_CODE_MAP } from "@/lib/sic-codes";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { number } = await params;
  const companyNumber = number.replace(/\s/g, "");
  if (!/^\d{6,8}$/.test(companyNumber)) {
    return NextResponse.json({ error: "Invalid company number" }, { status: 400 });
  }

  const apiKey = getCompaniesHouseApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Companies House API key is not configured in .env" },
      { status: 503 }
    );
  }
  const headers = companiesHouseHeaders(apiKey);
  const base = "https://api.company-information.service.gov.uk";

  try {
    const [profileRes, officersRes] = await Promise.all([
      fetch(`${base}/company/${companyNumber}`, { headers }),
      fetch(`${base}/company/${companyNumber}/officers?items_per_page=50`, { headers }),
    ]);

    if (!profileRes.ok) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    const profile = await profileRes.json();
    const officersData = officersRes.ok ? await officersRes.json() : { items: [] };

    const sicCodes: string[] = profile.sic_codes || [];
    const primarySic = sicCodes[0];
    const sicEntry = primarySic ? SIC_CODE_MAP[primarySic] : undefined;

    const officers: CompanyOfficer[] = (officersData.items || [])
      .filter((o: { resigned_on?: string }) => !o.resigned_on)
      .map((o: {
        name?: string;
        officer_role?: string;
        appointed_on?: string;
        nationality?: string;
        occupation?: string;
        country_of_residence?: string;
      }) => ({
        name: o.name || "",
        role: (o.officer_role || "officer").replace(/-/g, " "),
        appointedOn: o.appointed_on || "",
        nationality: o.nationality || "",
        occupation: o.occupation || "",
        countryOfResidence: o.country_of_residence || "",
      }));

    const addr = profile.registered_office_address;
    const result: CompanyProfile = {
      name: profile.company_name || "",
      registrationNumber: profile.company_number || companyNumber,
      status: profile.company_status || "unknown",
      type: (profile.type || "").replace(/-/g, " "),
      dateOfCreation: profile.date_of_creation || "",
      address: formatAddress(addr),
      city: addr?.locality || "",
      postalCode: addr?.postal_code || "",
      country: addr?.country || "United Kingdom",
      description: profile.company_name || "",
      sicCodes,
      website: "",
      phone: "",
      industry: sicEntry?.category || sicEntry?.label || "Technology",
      officers,
      accountsDue: profile.accounts?.next_due || "",
      lastAccountsMadeUpTo: profile.accounts?.last_accounts?.made_up_to || "",
      confirmationStatementDue: profile.confirmation_statement?.next_due || "",
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch company" }, { status: 500 });
  }
}
