"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  UserSearch,
  Sparkles,
  Loader2,
  Building2,
  Globe,
  Briefcase,
  Tag,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  MapPin,
} from "lucide-react";
import { toast } from "sonner";
import { DAILY_TAG_LIMIT, REGIONS, type RegionCode } from "@/lib/profile-parser";

interface JobListing {
  title: string;
  url: string;
  source?: string;
}

interface ProfileLead {
  id: string;
  companyName: string;
  role: string | null;
  duration: string | null;
  location: string | null;
  website: string | null;
  careersUrl: string | null;
  jobListings: JobListing[] | null;
  status: string;
  region: string;
}

interface PersonProfileResult {
  id: string;
  personName: string;
  headline: string | null;
  region: string;
  leads: ProfileLead[];
}

interface Quota {
  limit: number;
  used: number;
  remaining: number;
}

const EXAMPLE_JSON = `[
  { "company": "TechCorp Ltd", "role": "Senior Developer", "duration": "2021 - Present", "location": "London, UK" },
  { "company": "DataFlow Systems", "role": "Software Engineer", "duration": "2018 - 2021", "location": "Manchester" }
]`;

export default function ProfileIntelPage() {
  const [rawProfile, setRawProfile] = useState("");
  const [personName, setPersonName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [region, setRegion] = useState<RegionCode>("UK");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<PersonProfileResult | null>(null);
  const [quota, setQuota] = useState<Quota>({ limit: DAILY_TAG_LIMIT, used: 0, remaining: DAILY_TAG_LIMIT });
  const [taggingId, setTaggingId] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);

  const loadQuota = useCallback(async () => {
    const res = await fetch("/api/hr-leads/daily-quota");
    if (res.ok) setQuota(await res.json());
  }, []);

  useEffect(() => {
    loadQuota();
  }, [loadQuota]);

  const refreshProfile = useCallback(async (profileId: string) => {
    const res = await fetch(`/api/hr-leads/profile-analyze/${profileId}`);
    if (res.ok) {
      const data = await res.json();
      setResult(data);
      const pending = data.leads?.some((l: ProfileLead) => l.status === "PENDING" || l.status === "ENRICHING");
      return pending;
    }
    return false;
  }, []);

  useEffect(() => {
    if (!result?.id || !polling) return;
    const interval = setInterval(async () => {
      const stillPending = await refreshProfile(result.id);
      if (!stillPending) setPolling(false);
    }, 3000);
    return () => clearInterval(interval);
  }, [result?.id, polling, refreshProfile]);

  async function handleAnalyze() {
    if (!rawProfile.trim()) return;
    setAnalyzing(true);
    try {
      const res = await fetch("/api/hr-leads/profile-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawProfile, personName, linkedinUrl, region }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      setResult(data);
      setPolling(true);
      toast.success(`Found ${data.leads?.length || 0} companies from profile`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleTag(leadId: string) {
    setTaggingId(leadId);
    try {
      const res = await fetch(`/api/hr-leads/leads/${leadId}/tag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pipelineStage: "IDENTIFIED" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Tag failed");
      toast.success("Company tagged to CRM");
      setQuota(data.quota);
      if (result) await refreshProfile(result.id);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Tag failed");
    } finally {
      setTaggingId(null);
    }
  }

  function statusBadge(status: string) {
    const map: Record<string, string> = {
      PENDING: "bg-warm-100 text-warm-600",
      ENRICHING: "bg-blue-50 text-blue-600",
      ENRICHED: "bg-violet-50 text-violet-700",
      TAGGED: "bg-emerald-50 text-emerald-700",
      FAILED: "bg-red-50 text-red-600",
    };
    return map[status] || map.PENDING;
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-peach-50 via-white to-grape-100/40 border border-warm-200 p-6 sm:p-8 text-warm-800">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-peach-600 text-xs font-medium uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Profile Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-warm-800">Person → Company Discovery</h1>
          <p className="text-warm-600 mt-2 max-w-2xl text-sm">
            Paste any professional profile. We extract every company from their experience, discover websites via search, find job openings, and tag up to <strong>{DAILY_TAG_LIMIT} companies per day</strong> into your CRM.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-warm-200 shadow-sm text-sm">
            <Tag className="w-3.5 h-3.5 text-peach-500" />
            Today: <span className="font-semibold text-warm-800">{quota.used}/{quota.limit}</span> tagged
            <span className="text-warm-600">· {quota.remaining} remaining</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2 bg-white border-warm-200/60">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2 text-warm-800 font-semibold">
              <UserSearch className="w-5 h-5 text-violet-600" />
              Person profile
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label className="text-warm-600 text-xs">Name (optional)</Label>
                <Input
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="Auto-detected from profile"
                  className="mt-1 bg-warm-50 border-warm-200 h-9"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-warm-600 text-xs">LinkedIn URL (optional)</Label>
                <Input
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="mt-1 bg-warm-50 border-warm-200 h-9"
                />
              </div>
              <div className="col-span-2">
                <Label className="text-warm-600 text-xs">Region</Label>
                <Select value={region} onValueChange={(v) => setRegion((v ?? "UK") as RegionCode)}>
                  <SelectTrigger className="mt-1 bg-warm-50 border-warm-200 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-warm-200">
                    {REGIONS.map((r) => (
                      <SelectItem key={r.code} value={r.code}>{r.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label className="text-warm-600 text-xs">Profile / experience</Label>
                <button
                  type="button"
                  onClick={() => setRawProfile(EXAMPLE_JSON)}
                  className="text-[10px] text-violet-600 hover:underline"
                >
                  Load JSON example
                </button>
              </div>
              <Textarea
                value={rawProfile}
                onChange={(e) => setRawProfile(e.target.value)}
                placeholder={`Paste LinkedIn profile or JSON:\n\nJohn Smith\nSenior Engineer at TechCorp\n\nExperience\nTechCorp Ltd · Full-time\nJan 2020 - Present\nLondon, UK`}
                className="min-h-[220px] bg-warm-50 border-warm-200 text-sm font-mono"
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={analyzing || !rawProfile.trim()}
              className="w-full h-10 bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
            >
              {analyzing ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" /> Analyze profile</>
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="lg:col-span-3 space-y-4">
          {!result ? (
            <Card className="bg-warm-50/50 border-dashed border-warm-200 h-full min-h-[400px] flex items-center justify-center">
              <CardContent className="text-center text-warm-400 p-8">
                <UserSearch className="w-14 h-14 mx-auto mb-4 opacity-25" />
                <p className="font-medium text-warm-500">Paste a profile to discover companies</p>
                <p className="text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                  We search Google/DuckDuckGo for each company&apos;s website and careers page, then surface possible job openings.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-warm-800">{result.personName}</h2>
                  {result.headline && <p className="text-sm text-warm-500">{result.headline}</p>}
                </div>
                <div className="flex items-center gap-2">
                  {polling && (
                    <Badge className="bg-blue-50 text-blue-600 border-blue-200">
                      <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Enriching...
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-warm-200">
                    {result.leads.length} companies · {result.region}
                  </Badge>
                </div>
              </div>

              {result.leads.map((lead, i) => {
                const jobs = (lead.jobListings as JobListing[] | null) || [];
                return (
                  <motion.div
                    key={lead.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="bg-white border-warm-200/60 hover:border-violet-200 transition-colors">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1 space-y-3 min-w-0">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                                <Building2 className="w-5 h-5 text-violet-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-warm-800">{lead.companyName}</h3>
                                {lead.role && (
                                  <p className="text-sm text-warm-500">{lead.role}</p>
                                )}
                                <div className="flex flex-wrap gap-2 mt-1 text-xs text-warm-400">
                                  {lead.duration && <span>{lead.duration}</span>}
                                  {lead.location && (
                                    <span className="flex items-center gap-0.5">
                                      <MapPin className="w-3 h-3" />{lead.location}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <Badge className={`text-[10px] ${statusBadge(lead.status)}`}>
                                {lead.status}
                              </Badge>
                              {lead.website && (
                                <a
                                  href={lead.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 flex items-center gap-1 hover:bg-blue-100"
                                >
                                  <Globe className="w-3 h-3" /> Website
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                              {lead.careersUrl && (
                                <a
                                  href={lead.careersUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] px-2 py-0.5 rounded-md bg-peach-50 text-peach-700 border border-peach-100 flex items-center gap-1 hover:bg-peach-100"
                                >
                                  <Briefcase className="w-3 h-3" /> Careers
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>

                            {jobs.length > 0 && (
                              <div className="rounded-xl bg-warm-50 border border-warm-100 p-3">
                                <p className="text-[10px] font-semibold text-warm-500 uppercase tracking-wider mb-2">
                                  Possible openings ({jobs.length})
                                </p>
                                <ul className="space-y-1.5">
                                  {jobs.slice(0, 5).map((job, j) => (
                                    <li key={j}>
                                      <a
                                        href={job.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-violet-700 hover:underline flex items-center gap-1"
                                      >
                                        <Briefcase className="w-3 h-3 shrink-0" />
                                        {job.title}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {lead.status === "FAILED" && (
                              <p className="text-xs text-red-500 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> Could not enrich — tag manually or retry later
                              </p>
                            )}
                          </div>

                          {lead.status === "TAGGED" ? (
                            <Button size="sm" disabled className="shrink-0 bg-emerald-50 text-emerald-600 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Tagged
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleTag(lead.id)}
                              disabled={taggingId === lead.id || quota.remaining <= 0 || lead.status === "PENDING" || lead.status === "ENRICHING"}
                              className="shrink-0 bg-gradient-to-r from-peach-500 to-peach-400 text-white h-9"
                            >
                              {taggingId === lead.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <><Tag className="w-3.5 h-3.5 mr-1" /> Tag to CRM</>
                              )}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
