"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CompanyManageDialog } from "@/components/hr-leads/company-manage-dialog";
import {
  Search,
  Building2,
  MapPin,
  Hash,
  Calendar,
  Loader2,
  AlertCircle,
  SlidersHorizontal,
  Code2,
  Sparkles,
  ChevronDown,
  Settings2,
  Database,
  X,
} from "lucide-react";
import { IT_SIC_CODES, COMPANY_STATUS_OPTIONS, formatSicCode } from "@/lib/sic-codes";
import type { CompanySearchResult } from "@/lib/companies-house";

interface SavedCompanyRef {
  id: string;
  registrationNumber: string | null;
}

export default function CompanySearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const [sicFilter, setSicFilter] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(true);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<CompanySearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");
  const [savedMap, setSavedMap] = useState<Record<string, SavedCompanyRef>>({});
  const [manageReg, setManageReg] = useState<string | null>(null);

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

  async function handleSearch(sicOverride?: string) {
    const q = searchQuery.trim();
    const sic = sicOverride ?? sicFilter;
    if (!q && !sic && !location) return;

    setSearching(true);
    setError("");

    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (statusFilter) params.set("status", statusFilter);
      if (sic) params.set("sic", sic);
      if (location) params.set("location", location);
      params.set("mode", sic || location || statusFilter !== "active" ? "advanced" : "standard");

      const res = await fetch(`/api/companies-house?${params}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setResults([]);
        setTotalResults(0);
        setHasSearched(true);
        return;
      }

      if (res.status === 429) {
        setError("Too many searches. Please wait a moment.");
        return;
      }

      const items: CompanySearchResult[] = data.items || [];
      setResults(items);
      setTotalResults(data.total || items.length);
      setHasSearched(true);
      await loadSavedStatus(items);
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setSearching(false);
    }
  }

  function searchBySic(code: string) {
    setSicFilter(code);
    handleSearch(code);
  }

  function clearFilters() {
    setSicFilter("");
    setStatusFilter("active");
    setLocation("");
  }

  function getStatusColor(status: string) {
    switch (status?.toLowerCase()) {
      case "active": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "dissolved": return "bg-red-50 text-red-700 border-red-200";
      case "liquidation": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-warm-50 text-warm-600 border-warm-200";
    }
  }

  function handleSaved(regNumber: string, companyId: string) {
    setSavedMap((prev) => ({
      ...prev,
      [regNumber]: { id: companyId, registrationNumber: regNumber },
    }));
  }

  const activeFilters = [sicFilter, location, statusFilter !== "active" ? statusFilter : ""].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Hero header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-peach-50 via-white to-grape-100/40 border border-warm-200 p-6 sm:p-8 text-warm-800">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(232,149,106,0.5) 0%, transparent 50%)",
        }} />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-peach-600 text-xs font-medium uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            HR & Lead Generation
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-warm-800">Company Intelligence Search</h1>
          <p className="text-warm-600 mt-2 max-w-2xl text-sm sm:text-base">
            Search UK Companies House with IT industry SIC codes. Save companies, organise contacts, and manage your pipeline — all in one place.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="bg-white text-peach-600 border border-warm-200 shadow-sm hover:bg-warm-50">
              <Code2 className="w-3 h-3 mr-1" /> {IT_SIC_CODES.length} IT SIC codes
            </Badge>
            <Badge className="bg-white text-peach-600 border border-warm-200 shadow-sm hover:bg-warm-50">
              <Database className="w-3 h-3 mr-1" /> Save to CRM
            </Badge>
          </div>
        </div>
      </div>

      {/* Search panel */}
      <Card className="bg-white border-warm-200/60 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="p-4 sm:p-5 border-b border-warm-100">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
                <Input
                  placeholder="Company name or registration number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 h-11 bg-warm-50 border-warm-200 text-warm-800 focus:border-peach-300"
                />
              </div>
              <Button
                onClick={() => handleSearch()}
                disabled={searching}
                className="h-11 bg-gradient-to-r from-peach-500 to-peach-400 text-white px-6"
              >
                {searching ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Searching...</>
                ) : (
                  <><Search className="w-4 h-4 mr-2" /> Search</>
                )}
              </Button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="w-full flex items-center justify-between px-4 sm:px-5 py-3 text-sm text-warm-600 hover:bg-warm-50 transition-colors"
          >
            <span className="flex items-center gap-2 font-medium">
              <SlidersHorizontal className="w-4 h-4 text-peach-500" />
              Advanced filters
              {activeFilters > 0 && (
                <Badge className="bg-peach-100 text-peach-700 text-[10px]">{activeFilters}</Badge>
              )}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {advancedOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-warm-100"
              >
                <div className="p-4 sm:p-5 space-y-4 bg-warm-50/30">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium text-warm-500 mb-1.5 block">IT SIC code</label>
                      <Select value={sicFilter || "all"} onValueChange={(v) => setSicFilter(v === "all" ? "" : v ?? "")}>
                        <SelectTrigger className="bg-white border-warm-200 h-10">
                          <SelectValue placeholder="Any IT sector" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-warm-200 max-h-64">
                          <SelectItem value="all">Any sector</SelectItem>
                          {IT_SIC_CODES.map((s) => (
                            <SelectItem key={s.code} value={s.code}>
                              {s.code} — {s.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-warm-500 mb-1.5 block">Company status</label>
                      <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "active")}>
                        <SelectTrigger className="bg-white border-warm-200 h-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-warm-200">
                          {COMPANY_STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-warm-500 mb-1.5 block">Location</label>
                      <Input
                        placeholder="e.g. London, Manchester"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="bg-white border-warm-200 h-10"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-warm-500 mb-2">Quick IT sector search</p>
                    <div className="flex flex-wrap gap-1.5">
                      {IT_SIC_CODES.slice(0, 8).map((s) => (
                        <button
                          key={s.code}
                          type="button"
                          onClick={() => searchBySic(s.code)}
                          className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                            sicFilter === s.code
                              ? "bg-violet-600 text-white border-violet-600"
                              : "bg-white border-warm-200 text-warm-600 hover:border-violet-300 hover:text-violet-700"
                          }`}
                        >
                          <Code2 className="w-3 h-3 inline mr-1" />
                          {s.code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {activeFilters > 0 && (
                    <Button type="button" variant="ghost" size="sm" onClick={clearFilters} className="text-warm-500 h-8">
                      <X className="w-3.5 h-3.5 mr-1" /> Clear filters
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {hasSearched && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-warm-500">
              {totalResults > 0 ? (
                <>
                  <span className="font-semibold text-warm-800">{totalResults.toLocaleString()}</span> companies found
                  {searchQuery && <> for &ldquo;{searchQuery}&rdquo;</>}
                  {sicFilter && <> · SIC {sicFilter}</>}
                </>
              ) : (
                "No companies match your criteria"
              )}
            </p>
            <Badge variant="outline" className="border-blue-200 text-blue-600 bg-blue-50 text-xs">
              <Building2 className="w-3 h-3 mr-1" /> Companies House UK
            </Badge>
          </div>

          <div className="grid gap-3">
            <AnimatePresence>
              {results.map((company, i) => {
                const saved = savedMap[company.registrationNumber];
                return (
                  <motion.div
                    key={company.registrationNumber}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Card className="bg-white border-warm-200/60 hover:border-peach-200 hover:shadow-md transition-all group">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1 min-w-0 space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-peach-100 to-peach-50 border border-peach-200 flex items-center justify-center shrink-0">
                                <Building2 className="w-5 h-5 text-peach-600" />
                              </div>
                              <div className="min-w-0">
                                <h3 className="text-base font-semibold text-warm-800 group-hover:text-peach-700 transition-colors">
                                  {company.name}
                                </h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                                  {company.registrationNumber && (
                                    <span className="text-xs text-warm-500 flex items-center gap-1">
                                      <Hash className="w-3 h-3" />{company.registrationNumber}
                                    </span>
                                  )}
                                  {company.city && (
                                    <span className="text-xs text-warm-500 flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />{company.city}{company.postalCode ? `, ${company.postalCode}` : ""}
                                    </span>
                                  )}
                                  {company.dateOfCreation && (
                                    <span className="text-xs text-warm-500 flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />Est. {company.dateOfCreation}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5">
                              <Badge variant="outline" className={`text-[10px] ${getStatusColor(company.status)}`}>
                                {company.status}
                              </Badge>
                              {company.type && (
                                <Badge variant="outline" className="border-warm-200 text-warm-500 text-[10px]">
                                  {company.type}
                                </Badge>
                              )}
                              {saved && (
                                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">
                                  <Database className="w-3 h-3 mr-1" /> In CRM
                                </Badge>
                              )}
                            </div>

                            {company.sicCodes?.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {company.sicCodes.slice(0, 4).map((code) => (
                                  <span
                                    key={code}
                                    title={formatSicCode(code)}
                                    className="text-[10px] px-2 py-0.5 rounded-md bg-violet-50 text-violet-700 border border-violet-100"
                                  >
                                    <Code2 className="w-2.5 h-2.5 inline mr-0.5" />
                                    {code}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <Button
                            size="sm"
                            onClick={() => setManageReg(company.registrationNumber)}
                            className="bg-gradient-to-r from-peach-500 to-peach-400 text-white shrink-0 h-9"
                          >
                            <Settings2 className="w-3.5 h-3.5 mr-1.5" />
                            {saved ? "Manage" : "Save & manage"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {results.length === 0 && (
            <div className="text-center py-16 text-warm-400 rounded-2xl border border-dashed border-warm-200 bg-warm-50/30">
              <Building2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-medium text-warm-500">No results</p>
              <p className="text-sm mt-1">Try a different name, SIC code, or location</p>
            </div>
          )}
        </div>
      )}

      {!hasSearched && (
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Code2, title: "IT SIC codes", desc: "Filter by software, cloud, consultancy & telecom sectors", href: "/hr-leads/it-directory" },
            { icon: Building2, title: "Full company data", desc: "Registration, status, address, officers & accounts" },
            { icon: Database, title: "CRM integration", desc: "Save companies with contacts and emails to your pipeline" },
          ].map(({ icon: Icon, title, desc, href }) => (
            <Card key={title} className="bg-white border-warm-200/60">
              <CardContent className="p-5">
                <div className="w-9 h-9 rounded-lg bg-peach-50 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-peach-600" />
                </div>
                <h3 className="font-semibold text-warm-800 text-sm">{title}</h3>
                <p className="text-xs text-warm-500 mt-1 leading-relaxed">{desc}</p>
                {href && (
                  <a href={href} className="text-xs text-violet-600 hover:underline mt-2 inline-block font-medium">
                    Open IT Directory →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {manageReg && (
        <CompanyManageDialog
          open={Boolean(manageReg)}
          onOpenChange={(open) => !open && setManageReg(null)}
          registrationNumber={manageReg}
          savedCompany={savedMap[manageReg] ?? null}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
