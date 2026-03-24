"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Plus, Search, Filter, ExternalLink } from "lucide-react";

const stageColors: Record<string, string> = {
  IDENTIFIED: "border-warm-300/60 text-warm-500",
  RESEARCHING: "border-blue-300/60 text-blue-600",
  CONTACTED: "border-violet-300/60 text-violet-600",
  RESPONDING: "border-amber-300/60 text-amber-600",
  MEETING_SCHEDULED: "border-cyan-300/60 text-cyan-600",
  PROPOSAL_SENT: "border-pink-300/60 text-pink-600",
  NEGOTIATING: "border-orange-300/60 text-orange-600",
  WON: "border-emerald-300/60 text-emerald-600",
  LOST: "border-red-300/60 text-red-600",
  NURTURING: "border-indigo-300/60 text-indigo-600",
};

const mockCompanies = [
  { id: "1", name: "TechCorp Ltd", industry: "Information Technology", size: "51-200", city: "London", country: "UK", stage: "MEETING_SCHEDULED", source: "LinkedIn", contacts: 3, website: "techcorp.co.uk" },
  { id: "2", name: "GreenEnergy UK", industry: "Renewable Energy", size: "201-500", city: "Bristol", country: "UK", stage: "PROPOSAL_SENT", source: "Companies House", contacts: 2, website: "greenergy.uk" },
  { id: "3", name: "DataFlow Systems", industry: "Data Analytics", size: "11-50", city: "Cambridge", country: "UK", stage: "CONTACTED", source: "Referral", contacts: 1, website: "dataflow.io" },
  { id: "4", name: "SmartFactory", industry: "IoT & Manufacturing", size: "51-200", city: "Birmingham", country: "UK", stage: "RESPONDING", source: "Cold Outreach", contacts: 2, website: "smartfactory.com" },
  { id: "5", name: "Vertex Solutions", industry: "Software Development", size: "11-50", city: "Manchester", country: "UK", stage: "WON", source: "LinkedIn", contacts: 4, website: "vertex.co.uk" },
  { id: "6", name: "CloudNine UK", industry: "Cloud Computing", size: "1-10", city: "London", country: "UK", stage: "IDENTIFIED", source: "Website", contacts: 1, website: "cloudnine.uk" },
  { id: "7", name: "InnovateAI", industry: "Artificial Intelligence", size: "11-50", city: "Edinburgh", country: "UK", stage: "RESEARCHING", source: "LinkedIn", contacts: 2, website: "innovateai.com" },
  { id: "8", name: "Anglian Water", industry: "Utilities", size: "500+", city: "Lincoln", country: "UK", stage: "NEGOTIATING", source: "Referral", contacts: 3, website: "anglianwater.co.uk" },
];

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");

  const filtered = mockCompanies.filter((c) => {
    const matchesSearch = `${c.name} ${c.industry}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === "all" || c.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-peach-500" /> Companies
          </h1>
          <p className="text-warm-500 mt-1">{mockCompanies.length} companies in your database</p>
        </div>
        <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Company
        </Button>
      </div>

      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <Input placeholder="Search companies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-warm-50 border-warm-200 text-warm-800" />
            </div>
            <Select value={stageFilter} onValueChange={(v) => setStageFilter(v ?? "all")}>
              <SelectTrigger className="w-52 bg-warm-50 border-warm-200 text-warm-800"><Filter className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white border-warm-200">
                <SelectItem value="all">All Stages</SelectItem>
                {Object.keys(stageColors).map((s) => <SelectItem key={s} value={s}>{s.replace(/_/g, " ")}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Company</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Industry</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Size</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Location</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Pipeline Stage</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Source</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Contacts</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((company) => (
                  <tr key={company.id} className="border-b border-warm-200/60 hover:bg-warm-50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-warm-800">{company.name}</p>
                      <p className="text-xs text-peach-600 flex items-center gap-1"><ExternalLink className="w-3 h-3" />{company.website}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-warm-600">{company.industry}</td>
                    <td className="py-3 px-4 text-sm text-warm-500">{company.size}</td>
                    <td className="py-3 px-4 text-sm text-warm-500">{company.city}, {company.country}</td>
                    <td className="py-3 px-4"><Badge variant="outline" className={stageColors[company.stage]}>{company.stage.replace(/_/g, " ")}</Badge></td>
                    <td className="py-3 px-4 text-sm text-warm-500">{company.source}</td>
                    <td className="py-3 px-4 text-sm text-warm-600">{company.contacts}</td>
                    <td className="py-3 px-4"><Button variant="ghost" size="sm" className="text-peach-600 hover:text-peach-700 hover:bg-peach-50/50">View</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
