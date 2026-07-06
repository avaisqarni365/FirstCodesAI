export interface SicCode {
  code: string;
  label: string;
  category: string;
}

export const IT_SIC_CODES: SicCode[] = [
  { code: "62011", label: "Ready-made leisure & entertainment software", category: "Software" },
  { code: "62012", label: "Business & domestic software development", category: "Software" },
  { code: "62020", label: "IT consultancy activities", category: "Consulting" },
  { code: "62030", label: "Computer facilities management", category: "Infrastructure" },
  { code: "62090", label: "Other IT service activities", category: "Services" },
  { code: "63110", label: "Data processing, hosting & related", category: "Cloud & Data" },
  { code: "63120", label: "Web portals", category: "Digital" },
  { code: "58210", label: "Publishing of computer games", category: "Gaming" },
  { code: "58290", label: "Other software publishing", category: "Software" },
  { code: "61900", label: "Other telecommunications activities", category: "Telecoms" },
  { code: "63910", label: "News agency activities", category: "Digital Media" },
  { code: "63990", label: "Other information service activities", category: "Information" },
  { code: "26110", label: "Electronic components manufacture", category: "Hardware" },
  { code: "26200", label: "Computers & peripheral equipment", category: "Hardware" },
  { code: "26301", label: "Telecommunications equipment", category: "Hardware" },
];

/** Group IT SIC codes by category for directory browsing */
export const IT_SIC_BY_CATEGORY = IT_SIC_CODES.reduce<Record<string, SicCode[]>>((acc, sic) => {
  if (!acc[sic.category]) acc[sic.category] = [];
  acc[sic.category].push(sic);
  return acc;
}, {});

export const SIC_CODE_MAP = Object.fromEntries(IT_SIC_CODES.map((s) => [s.code, s]));

export function formatSicCode(code: string): string {
  const entry = SIC_CODE_MAP[code];
  return entry ? `${code} — ${entry.label}` : code;
}

export const COMPANY_STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "dissolved", label: "Dissolved" },
  { value: "liquidation", label: "In Liquidation" },
  { value: "administration", label: "In Administration" },
  { value: "voluntary-arrangement", label: "Voluntary Arrangement" },
  { value: "converted-closed", label: "Converted / Closed" },
  { value: "receivership", label: "Receivership" },
];

export const PIPELINE_STAGES = [
  "IDENTIFIED",
  "RESEARCHING",
  "CONTACTED",
  "RESPONDING",
  "MEETING_SCHEDULED",
  "PROPOSAL_SENT",
  "NEGOTIATING",
  "WON",
  "LOST",
  "NURTURING",
] as const;
