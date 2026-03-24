"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, Plus, MapPin, Hash, Calendar, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface CompanyResult {
  name: string;
  registrationNumber: string;
  status: string;
  type: string;
  dateOfCreation: string;
  address: string;
  city: string;
  country: string;
  description: string;
}

export default function CompanySearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<CompanyResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [addingCompany, setAddingCompany] = useState<string | null>(null);
  const [addedCompanies, setAddedCompanies] = useState<Set<string>>(new Set());
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setError("");

    try {
      const res = await fetch(`/api/companies-house?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data.items || []);
      setTotalResults(data.total || 0);
      setHasSearched(true);
    } catch {
      setError("Failed to search. Please try again.");
    } finally {
      setSearching(false);
    }
  }

  async function addToPipeline(company: CompanyResult) {
    setAddingCompany(company.registrationNumber);
    try {
      const res = await fetch("/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: company.name,
          registrationNumber: company.registrationNumber,
          address: company.address,
          city: company.city,
          country: company.country,
          source: "Companies House",
          pipelineStage: "IDENTIFIED",
        }),
      });

      if (res.ok) {
        setAddedCompanies((prev) => new Set(prev).add(company.registrationNumber));
      }
    } catch {
      // silently fail
    } finally {
      setAddingCompany(null);
    }
  }

  function getStatusColor(status: string) {
    switch (status?.toLowerCase()) {
      case "active": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "dissolved": return "bg-red-50 text-red-700 border-red-200";
      case "liquidation": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-warm-50 text-warm-600 border-warm-200";
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <Building2 className="w-6 h-6 text-peach-500" /> Companies House Search
        </h1>
        <p className="text-warm-500 mt-1">Search the official UK Companies House register and add companies to your pipeline</p>
      </div>

      {/* Search Bar */}
      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <Input
                placeholder="Search company name or registration number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 bg-warm-50 border-warm-200 text-warm-800 focus:border-peach-300"
              />
            </div>
            <Button onClick={handleSearch} disabled={searching} className="bg-gradient-to-r from-peach-500 to-peach-400 text-white">
              {searching ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Searching...</>
              ) : (
                <><Search className="w-4 h-4 mr-2" /> Search</>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Results */}
      {hasSearched && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-warm-500">
              {totalResults > 0 ? (
                <>Found <span className="font-semibold text-warm-700">{totalResults.toLocaleString()}</span> companies matching &ldquo;{searchQuery}&rdquo;</>
              ) : (
                <>No results found for &ldquo;{searchQuery}&rdquo;</>
              )}
            </p>
            <Badge variant="outline" className="border-blue-200 text-blue-600 bg-blue-50 text-xs">
              <Building2 className="w-3 h-3 mr-1" /> Companies House UK
            </Badge>
          </div>

          {results.map((company) => {
            const isAdded = addedCompanies.has(company.registrationNumber);
            const isAdding = addingCompany === company.registrationNumber;

            return (
              <Card key={company.registrationNumber} className="bg-white border-warm-200/60 hover:border-peach-200 hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-warm-800">{company.name}</h3>
                      <div className="flex items-center gap-4 mt-2 flex-wrap">
                        {company.registrationNumber && (
                          <span className="text-xs text-warm-500 flex items-center gap-1">
                            <Hash className="w-3 h-3" />{company.registrationNumber}
                          </span>
                        )}
                        {company.address && (
                          <span className="text-xs text-warm-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />{company.address}
                          </span>
                        )}
                        {company.dateOfCreation && (
                          <span className="text-xs text-warm-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />Inc. {company.dateOfCreation}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className={`text-[10px] ${getStatusColor(company.status)}`}>
                          {company.status}
                        </Badge>
                        {company.type && (
                          <Badge variant="outline" className="border-warm-200 text-warm-500 text-[10px]">
                            {company.type.replace(/-/g, " ")}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {isAdded ? (
                      <Button size="sm" disabled className="bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Added
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => addToPipeline(company)}
                        disabled={isAdding}
                        className="bg-gradient-to-r from-peach-500 to-peach-400 text-white shrink-0"
                      >
                        {isAdding ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <><Plus className="w-3.5 h-3.5 mr-1" /> Add to Pipeline</>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {results.length === 0 && totalResults === 0 && (
            <div className="text-center py-16 text-warm-400">
              <Building2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No companies found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      {!hasSearched && (
        <div className="text-center py-20 text-warm-400">
          <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
          <p className="text-lg font-medium text-warm-500">Search the UK Companies House Register</p>
          <p className="text-sm mt-2 max-w-md mx-auto">Enter a company name or registration number to search the official UK Companies House database and add companies to your pipeline.</p>
        </div>
      )}
    </div>
  );
}
