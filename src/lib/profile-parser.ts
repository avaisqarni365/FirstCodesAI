export const DAILY_TAG_LIMIT = 10;

export const REGIONS = [
  { code: "UK", label: "United Kingdom", searchSuffix: "UK", tld: "co.uk" },
  { code: "EU", label: "Europe", searchSuffix: "Europe", tld: "com" },
  { code: "US", label: "United States", searchSuffix: "USA", tld: "com" },
  { code: "IN", label: "India", searchSuffix: "India", tld: "in" },
  { code: "AE", label: "UAE / Middle East", searchSuffix: "UAE", tld: "ae" },
] as const;

export type RegionCode = (typeof REGIONS)[number]["code"];

export function getRegion(code: string) {
  return REGIONS.find((r) => r.code === code) ?? REGIONS[0];
}

export interface ParsedExperience {
  companyName: string;
  role: string;
  duration: string;
  location: string;
}

export interface JobListing {
  title: string;
  url: string;
  location?: string;
  source: string;
}

export interface EnrichmentResult {
  website: string;
  careersUrl: string;
  jobListings: JobListing[];
  searchQuery: string;
}

/** Extract person name from first line of profile paste */
export function extractPersonName(raw: string): string {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length) return "Unknown";
  const first = lines[0];
  if (first.length > 60 || first.includes("@") || first.toLowerCase().includes("experience")) {
    return "Unknown";
  }
  return first.replace(/\s+/g, " ").slice(0, 80);
}

/** Parse LinkedIn-style pasted profile into work experience entries */
export function parseProfileExperiences(raw: string): ParsedExperience[] {
  const experiences: ParsedExperience[] = [];
  const text = raw.replace(/\r\n/g, "\n");

  // JSON array format: [{ company, role, duration, location }]
  if (text.trim().startsWith("[")) {
    try {
      const arr = JSON.parse(text) as Array<Record<string, string>>;
      return arr
        .filter((e) => e.company || e.companyName)
        .map((e) => ({
          companyName: (e.company || e.companyName || "").trim(),
          role: (e.role || e.title || e.jobTitle || "").trim(),
          duration: (e.duration || e.dates || "").trim(),
          location: (e.location || "").trim(),
        }));
    } catch {
      // fall through to text parser
    }
  }

  const blocks = text.split(/\n(?=Experience\n)|\n{2,}(?=[A-Z])/i);
  const experienceSection = text.includes("Experience")
    ? text.split(/Experience/i)[1]?.split(/Education|Skills|Licenses|Projects/i)[0] || text
    : text;

  const lines = experienceSection.split("\n").map((l) => l.trim()).filter(Boolean);

  let current: Partial<ParsedExperience> | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lower = line.toLowerCase();

    if (lower === "experience" || lower.startsWith("work experience")) continue;

    const durationMatch = line.match(
      /((?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}|\d{4})\s*[-–—]\s*((?:present|current|now)|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d{4}|\d{4})/i
    );
    const durationOnly = line.match(/^(\d+\s*(?:yr|yrs|year|years|mo|mos|month).*)$/i);

    if (durationMatch || durationOnly) {
      if (current?.companyName) {
        current.duration = line;
        experiences.push({
          companyName: current.companyName,
          role: current.role || "",
          duration: current.duration || "",
          location: current.location || "",
        });
        current = null;
      }
      continue;
    }

    const isLocation =
      /^[A-Za-z\s,.-]+,\s*[A-Za-z\s.-]+$/.test(line) &&
      line.length < 80 &&
      !line.includes("·") &&
      !line.includes("|");

    if (isLocation && current?.companyName && !current.location) {
      current.location = line;
      continue;
    }

    const companyRoleSplit = line.split(/\s*[·|]\s*/);
    if (companyRoleSplit.length >= 2 && line.length < 120) {
      if (current?.companyName) {
        experiences.push({
          companyName: current.companyName,
          role: current.role || "",
          duration: current.duration || "",
          location: current.location || "",
        });
      }
      current = {
        companyName: companyRoleSplit[0].trim(),
        role: companyRoleSplit.slice(1).join(" · ").trim(),
      };
      continue;
    }

    if (line.length < 80 && !lower.includes("full-time") && !lower.includes("part-time") && !lower.includes("contract")) {
      if (!current) {
        current = { companyName: line, role: "" };
      } else if (!current.role && current.companyName) {
        current.role = line;
      } else if (current.companyName) {
        experiences.push({
          companyName: current.companyName,
          role: current.role || "",
          duration: current.duration || "",
          location: current.location || "",
        });
        current = { companyName: line, role: "" };
      }
    }
  }

  if (current?.companyName) {
    experiences.push({
      companyName: current.companyName,
      role: current.role || "",
      duration: current.duration || "",
      location: current.location || "",
    });
  }

  const seen = new Set<string>();
  return experiences.filter((e) => {
    const key = e.companyName.toLowerCase();
    if (!e.companyName || seen.has(key) || e.companyName.length < 2) return false;
    seen.add(key);
    return true;
  });
}

export function extractHeadline(raw: string): string {
  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return "";
  const second = lines[1];
  if (second.length < 120 && !second.match(/^\d{4}/)) return second;
  return "";
}
