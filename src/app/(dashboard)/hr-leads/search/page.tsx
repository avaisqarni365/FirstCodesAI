"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Building2, Globe, Link, Plus, ExternalLink, MapPin, Hash } from "lucide-react";

const companiesHouseResults = [
  { name: "TechVenture Solutions Ltd", regNumber: "14523678", address: "20 Old Bailey, London, EC4M 7LN", industry: "Information Technology", status: "Active", website: "techventure.co.uk", incorporated: "2022-03-15" },
  { name: "DataBridge Analytics Ltd", regNumber: "13876542", address: "5 Churchill Place, Canary Wharf, London, E14 5HU", industry: "Data Analytics", status: "Active", website: "databridge.io", incorporated: "2021-06-20" },
  { name: "GreenWave Energy Systems Ltd", regNumber: "15234891", address: "44 Moorfields, London, EC2Y 9AL", industry: "Renewable Energy", status: "Active", website: "greenwave.energy", incorporated: "2023-01-10" },
  { name: "CloudPeak Infrastructure Ltd", regNumber: "12987456", address: "1 Canada Square, London, E14 5AB", industry: "Cloud Computing", status: "Active", website: "cloudpeak.co.uk", incorporated: "2020-11-05" },
  { name: "SmartGrid Electronics Ltd", regNumber: "14567890", address: "90 Bartholomew Close, London, EC1A 7EA", industry: "Electronics", status: "Active", website: "smartgrid-electronics.com", incorporated: "2022-08-22" },
  { name: "AeroFlow Dynamics Ltd", regNumber: "15678901", address: "30 St Mary Axe, London, EC3A 8BF", industry: "Aerospace & IoT", status: "Active", website: "aeroflow.co.uk", incorporated: "2023-05-14" },
];

const linkedinResults = [
  { name: "Quantum AI Labs", regNumber: "", address: "Cambridge, UK", industry: "Artificial Intelligence", status: "51-200 employees", website: "quantumai.co.uk", incorporated: "" },
  { name: "Nordic Data Systems", regNumber: "", address: "Edinburgh, UK", industry: "Data Engineering", status: "11-50 employees", website: "nordicdata.co.uk", incorporated: "" },
  { name: "BrightPath Digital", regNumber: "", address: "Manchester, UK", industry: "Digital Transformation", status: "201-500 employees", website: "brightpath.digital", incorporated: "" },
];

const globalResults = [
  { name: "SynapseAI GmbH", regNumber: "HRB 234567", address: "Berlin, Germany", industry: "AI & Machine Learning", status: "Active", website: "synapseai.de", incorporated: "2021-04-01" },
  { name: "DataStream Technologies Inc", regNumber: "C4567890", address: "San Francisco, USA", industry: "Big Data", status: "Active", website: "datastream.tech", incorporated: "2019-09-15" },
  { name: "CloudMatrix Pty Ltd", regNumber: "ACN 654321987", address: "Sydney, Australia", industry: "Cloud Infrastructure", status: "Active", website: "cloudmatrix.au", incorporated: "2020-02-28" },
];

export default function CompanySearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  function handleSearch() {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setHasSearched(true);
    }, 800);
  }

  function ResultCard({ company, source }: { company: typeof companiesHouseResults[0]; source: string }) {
    return (
      <Card className="bg-white border-warm-200/60 hover:bg-warm-50 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-warm-800">{company.name}</h3>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {company.regNumber && (
                  <span className="text-xs text-warm-500 flex items-center gap-1"><Hash className="w-3 h-3" />{company.regNumber}</span>
                )}
                <span className="text-xs text-warm-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{company.address}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="border-peach-300/60 text-peach-600 text-[10px]">{company.industry}</Badge>
                <Badge variant="outline" className="border-emerald-300/60 text-emerald-600 text-[10px]">{company.status}</Badge>
                <Badge variant="outline" className="border-warm-200/60 text-warm-500 text-[10px]">{source}</Badge>
              </div>
              {company.website && <p className="text-xs text-peach-600 mt-2 flex items-center gap-1"><ExternalLink className="w-3 h-3" />{company.website}</p>}
            </div>
            <Button size="sm" className="bg-gradient-to-r from-peach-500 to-peach-400 text-white shrink-0">
              <Plus className="w-3 h-3 mr-1" /> Add to Pipeline
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <Search className="w-6 h-6 text-peach-500" /> Company Search
        </h1>
        <p className="text-warm-500 mt-1">Search companies from UK Companies House, LinkedIn, and global sources</p>
      </div>

      {/* Search Bar */}
      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <Input
                placeholder="Search company name, industry, or registration number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 bg-warm-50 border-warm-200 text-warm-800"
              />
            </div>
            <Button onClick={handleSearch} disabled={searching} className="bg-gradient-to-r from-peach-500 to-peach-400 text-white">
              {searching ? "Searching..." : "Search All Sources"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Tabs */}
      {hasSearched && (
        <Tabs defaultValue="companies-house">
          <TabsList className="bg-warm-50 border border-warm-200">
            <TabsTrigger value="companies-house" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-warm-500 data-[state=active]:text-warm-800">
              <Building2 className="w-4 h-4 mr-2" /> Companies House ({companiesHouseResults.length})
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-warm-500 data-[state=active]:text-warm-800">
              <Link className="w-4 h-4 mr-2" /> LinkedIn ({linkedinResults.length})
            </TabsTrigger>
            <TabsTrigger value="global" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-warm-500 data-[state=active]:text-warm-800">
              <Globe className="w-4 h-4 mr-2" /> Global ({globalResults.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="companies-house" className="mt-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="border-amber-300/60 text-amber-600">API Key Required</Badge>
              <span className="text-xs text-warm-400">Configure your Companies House API key in Settings</span>
            </div>
            {companiesHouseResults.map((c, i) => <ResultCard key={i} company={c} source="Companies House" />)}
          </TabsContent>

          <TabsContent value="linkedin" className="mt-4 space-y-3">
            {linkedinResults.map((c, i) => <ResultCard key={i} company={c} source="LinkedIn" />)}
          </TabsContent>

          <TabsContent value="global" className="mt-4 space-y-3">
            {globalResults.map((c, i) => <ResultCard key={i} company={c} source="Global" />)}
          </TabsContent>
        </Tabs>
      )}

      {!hasSearched && (
        <div className="text-center py-20 text-warm-400">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>Search for companies across multiple sources</p>
          <p className="text-sm mt-1">UK Companies House, LinkedIn, and global databases</p>
        </div>
      )}
    </div>
  );
}
