"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CompanyManageDialog } from "@/components/hr-leads/company-manage-dialog";
import {
  Code2,
  Building2,
  MapPin,
  Hash,
  Calendar,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Settings2,
  Database,
  Sparkles,
  Search,
} from "lucide-react";
import {
  IT_SIC_CODES,
  IT_SIC_BY_CATEGORY,
  COMPANY_STATUS_OPTIONS,
  formatSicCode,
} from "@/lib/sic-codes";
import type { CompanySearchResult } from "@/lib/companies-house";

const PAGE_SIZE = 25;

interface SavedCompanyRef {
  id: string;
  registrationNumber: string | null;
}

export default function ITDirectoryPage() {
  const [selectedSic, setSelectedSic] = useState(IT_SIC_CODES[1].code); // 62012 software default
  const [location, setLocation] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [page, setPage] = useState(0);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<CompanySearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [savedMap, setSavedMap] = useState<Record<string, SavedCompanyRef>>({});
  const [manageReg, setManageReg] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [error, setError] = useState("");

  const filteredCodes =
    categoryFilter === "all"
      ? IT_SIC_CODES
      : IT_SIC_BY_CATEGORY[categoryFilter] || IT_SIC_CODES;

  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  const loadSavedStatus = useCallback(async (items: CompanySearchResult[]) => {
    const numbers = items.map((i) => i.registrationNumber).filter(Boolean);
    if (!numbers.length) return;
    const res = await fetch(`/api/companies?registrationNumbers=${numbers.join(",")}`);
    if (!res.ok) return;
    const companies: SavedCompanyRef[] = await res.json();
    const map: Record<string, SavedCompanyRef> = {};
    for (const c of companies) {
      if (c.registrationNumber) map[c.registrationNumber] = c;
    }
    setSavedMap((prev) => ({ ...prev, ...map }));
  }, []);

  async function browseCompanies(sic: string, pageNum = 0) {
    setSearching(true);
    setSelectedSic(sic);
    setPage(pageNum);
    setError("");

    try {
      const params = new URLSearchParams({
        sic,
        status: statusFilter,
        mode: "advanced",
        page: String(pageNum),
        size: String(PAGE_SIZE),
      });
      if (location.trim()) params.set("location", location.trim());

      const res = await fetch(`/api/companies-house?${params}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setResults([]);
        setTotalResults(0);
        setHasLoaded(true);
        return;
      }

      const items: CompanySearchResult[] = data.items || [];
      setResults(items);
      setTotalResults(data.total || items.length);
      setHasLoaded(true);
      await loadSavedStatus(items);
    } finally {
      setSearching(false);
    }
  }

  function getStatusColor(status: string) {
    switch (status?.toLowerCase()) {
      case "active": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default: return "bg-warm-50 text-warm-600 border-warm-200";
    }
  }

  const selectedMeta = IT_SIC_CODES.find((s) => s.code === selectedSic);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-peach-50 via-white to-grape-100/40 border border-warm-200 p-6 sm:p-8 text-warm-800">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-peach-600 text-xs font-medium uppercase tracking-wider mb-2">
            <Code2 className="w-3.5 h-3.5" />
            IT Companies Directory
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-warm-800">Browse UK IT Companies by SIC Code</h1>
          <p className="text-warm-600 mt-2 max-w-2xl text-sm">
            Direct search from Companies House — all active companies registered under a specific IT Standard Industrial Classification (SIC) code. No company name needed.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* SIC picker */}
        <Card className="lg:col-span-4 bg-white border-warm-200/60 h-fit">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-warm-800 text-sm">IT SIC codes</h2>
              <Badge variant="outline" className="text-[10px] border-violet-200 text-violet-600">
                {IT_SIC_CODES.length} codes
              </Badge>
            </div>

            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "all")}>
              <SelectTrigger className="h-9 bg-warm-50 border-warm-200 text-sm">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent className="bg-white border-warm-200">
                <SelectItem value="all">All categories</SelectItem>
                {Object.keys(IT_SIC_BY_CATEGORY).map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
              {filteredCodes.map((sic) => (
                <button
                  key={sic.code}
                  type="button"
                  onClick={() => browseCompanies(sic.code, 0)}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    selectedSic === sic.code && hasLoaded
                      ? "border-violet-400 bg-violet-50 shadow-sm"
                      : "border-warm-100 bg-warm-50/50 hover:border-violet-200 hover:bg-violet-50/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge className="bg-violet-600 text-white text-[10px] shrink-0">{sic.code}</Badge>
                    <span className="text-[10px] text-warm-400">{sic.category}</span>
                  </div>
                  <p className="text-xs text-warm-700 mt-1.5 leading-snug">{sic.label}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="bg-white border-warm-200/60">
            <CardContent className="p-4 flex flex-wrap items-end gap-3">
              <div className="flex-1 min-w-[140px]">
                <label className="text-[10px] font-medium text-warm-500 uppercase tracking-wider">Location filter</label>
                <Input
                  placeholder="e.g. London"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 h-9 bg-warm-50 border-warm-200"
                />
              </div>
              <div className="w-40">
                <label className="text-[10px] font-medium text-warm-500 uppercase tracking-wider">Status</label>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "active")}>
                  <SelectTrigger className="mt-1 h-9 bg-warm-50 border-warm-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-warm-200">
                    {COMPANY_STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => browseCompanies(selectedSic, 0)}
                disabled={searching}
                className="h-9 bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
              >
                {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4 mr-1.5" />}
                Browse
              </Button>
            </CardContent>
          </Card>

          {error && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {!hasLoaded ? (
            <Card className="border-dashed border-warm-200 bg-warm-50/30 min-h-[300px] flex items-center justify-center">
              <CardContent className="text-center p-8 text-warm-400">
                <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="font-medium text-warm-600">Select an IT SIC code</p>
                <p className="text-xs mt-2 max-w-xs mx-auto">
                  Click any code on the left to list all matching UK companies from Companies House
                </p>
                <Button
                  className="mt-4 bg-violet-600 text-white"
                  size="sm"
                  onClick={() => browseCompanies("62012", 0)}
                >
                  Browse software companies (62012)
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-bold text-warm-800">
                    {selectedMeta?.label || formatSicCode(selectedSic)}
                  </h2>
                  <p className="text-sm text-warm-500">
                    SIC <span className="font-mono font-semibold text-violet-600">{selectedSic}</span>
                    {" · "}
                    <span className="font-semibold text-warm-700">{totalResults.toLocaleString()}</span> companies
                    {location && <> in {location}</>}
                  </p>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={page <= 0 || searching}
                      onClick={() => browseCompanies(selectedSic, page - 1)}
                      className="h-8 border-warm-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-xs text-warm-500">
                      Page {page + 1} of {totalPages}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={page >= totalPages - 1 || searching}
                      onClick={() => browseCompanies(selectedSic, page + 1)}
                      className="h-8 border-warm-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {searching ? (
                <div className="flex items-center justify-center py-20 text-warm-400">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Loading companies...
                </div>
              ) : (
                <div className="space-y-2">
                  {results.map((company, i) => {
                    const saved = savedMap[company.registrationNumber];
                    return (
                      <motion.div
                        key={company.registrationNumber}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.02 }}
                      >
                        <Card className="bg-white border-warm-200/60 hover:border-violet-200 transition-colors">
                          <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h3 className="font-semibold text-warm-800 text-sm">{company.name}</h3>
                                <Badge variant="outline" className={`text-[10px] ${getStatusColor(company.status)}`}>
                                  {company.status}
                                </Badge>
                                {saved && (
                                  <Badge className="bg-emerald-50 text-emerald-700 text-[10px]">
                                    <Database className="w-3 h-3 mr-0.5" /> In CRM
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-3 mt-1 text-xs text-warm-500">
                                <span className="flex items-center gap-1"><Hash className="w-3 h-3" />{company.registrationNumber}</span>
                                {company.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{company.city}</span>}
                                {company.dateOfCreation && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{company.dateOfCreation}</span>}
                              </div>
                              {company.sicCodes?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {company.sicCodes.map((c) => (
                                    <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-100">
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => setManageReg(company.registrationNumber)}
                              className="shrink-0 bg-gradient-to-r from-peach-500 to-peach-400 text-white h-8"
                            >
                              <Settings2 className="w-3.5 h-3.5 mr-1" />
                              {saved ? "Manage" : "Save"}
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                  {results.length === 0 && (
                    <p className="text-center py-12 text-warm-400 text-sm">No companies found for this SIC code</p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {manageReg && (
        <CompanyManageDialog
          open={Boolean(manageReg)}
          onOpenChange={(open) => !open && setManageReg(null)}
          registrationNumber={manageReg}
          savedCompany={savedMap[manageReg] ?? null}
          onSaved={(reg, id) => setSavedMap((p) => ({ ...p, [reg]: { id, registrationNumber: reg } }))}
        />
      )}
    </div>
  );
}
