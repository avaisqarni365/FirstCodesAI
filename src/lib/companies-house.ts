export interface CompaniesHouseAddress {
  address_line_1?: string;
  address_line_2?: string;
  locality?: string;
  postal_code?: string;
  region?: string;
  country?: string;
}

export function formatAddress(addr?: CompaniesHouseAddress | null): string {
  if (!addr) return "";
  return [
    addr.address_line_1,
    addr.address_line_2,
    addr.locality,
    addr.postal_code,
    addr.region,
    addr.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export function companiesHouseHeaders(apiKey?: string): Record<string, string> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (apiKey) {
    headers.Authorization = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
  }
  return headers;
}

export function getCompaniesHouseApiKey(): string | undefined {
  const key = process.env.COMPANIES_HOUSE_API_KEY?.trim();
  return key || undefined;
}

export interface CompanySearchResult {
  name: string;
  registrationNumber: string;
  status: string;
  type: string;
  dateOfCreation: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  description: string;
  sicCodes: string[];
}

export interface CompanyOfficer {
  name: string;
  role: string;
  appointedOn: string;
  nationality: string;
  occupation: string;
  countryOfResidence: string;
}

export interface CompanyProfile extends CompanySearchResult {
  website: string;
  phone: string;
  industry: string;
  officers: CompanyOfficer[];
  accountsDue: string;
  lastAccountsMadeUpTo: string;
  confirmationStatementDue: string;
}
