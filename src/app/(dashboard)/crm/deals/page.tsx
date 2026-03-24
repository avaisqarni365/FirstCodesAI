"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Handshake, Plus, TrendingUp, Target, Calendar, DollarSign } from "lucide-react";

const stages = [
  { key: "DISCOVERY", label: "Discovery", color: "bg-warm-400" },
  { key: "QUALIFICATION", label: "Qualification", color: "bg-blue-500" },
  { key: "PROPOSAL", label: "Proposal", color: "bg-violet-500" },
  { key: "NEGOTIATION", label: "Negotiation", color: "bg-amber-500" },
  { key: "CLOSED_WON", label: "Won", color: "bg-emerald-500" },
  { key: "CLOSED_LOST", label: "Lost", color: "bg-red-500" },
];

const mockDeals = [
  { id: "1", title: "Enterprise Data Platform", company: "Anglian Water", value: 85000, stage: "PROPOSAL", probability: 75, expectedClose: "2026-04-15", owner: "Avais" },
  { id: "2", title: "AI Automation Suite", company: "TechCorp Ltd", value: 52000, stage: "NEGOTIATION", probability: 60, expectedClose: "2026-04-01", owner: "Avais" },
  { id: "3", title: "Cloud Migration", company: "GreenEnergy UK", value: 45000, stage: "QUALIFICATION", probability: 40, expectedClose: "2026-05-20", owner: "Jehanzaib" },
  { id: "4", title: "IoT Dashboard", company: "SmartFactory", value: 38000, stage: "DISCOVERY", probability: 20, expectedClose: "2026-06-30", owner: "Avais" },
  { id: "5", title: "Power BI Analytics", company: "Vertex Solutions", value: 28000, stage: "CLOSED_WON", probability: 100, expectedClose: "2026-03-10", owner: "Avais" },
  { id: "6", title: "Data Lake Architecture", company: "DataFlow Systems", value: 72000, stage: "PROPOSAL", probability: 65, expectedClose: "2026-04-25", owner: "Jehanzaib" },
  { id: "7", title: "CRM Integration", company: "CloudNine UK", value: 18000, stage: "DISCOVERY", probability: 15, expectedClose: "2026-07-15", owner: "Avais" },
  { id: "8", title: "VoIP System Setup", company: "InnovateAI", value: 12000, stage: "QUALIFICATION", probability: 35, expectedClose: "2026-05-10", owner: "Avais" },
  { id: "9", title: "SAP Data Integration", company: "MegaRetail", value: 95000, stage: "NEGOTIATION", probability: 70, expectedClose: "2026-04-20", owner: "Avais" },
  { id: "10", title: "Azure DevOps Pipeline", company: "FinServe Ltd", value: 22000, stage: "CLOSED_LOST", probability: 0, expectedClose: "2026-03-01", owner: "Jehanzaib" },
];

export default function DealsPage() {
  const totalPipeline = mockDeals.filter(d => !d.stage.startsWith("CLOSED")).reduce((sum, d) => sum + d.value, 0);
  const wonDeals = mockDeals.filter(d => d.stage === "CLOSED_WON");
  const totalDeals = mockDeals.length;
  const winRate = Math.round((wonDeals.length / totalDeals) * 100);
  const avgDealSize = Math.round(totalPipeline / mockDeals.filter(d => !d.stage.startsWith("CLOSED")).length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Handshake className="w-6 h-6 text-emerald-500" /> Deals Pipeline
          </h1>
          <p className="text-warm-500 mt-1">Track and manage your sales pipeline</p>
        </div>
        <Button className="bg-gradient-to-r from-peach-500 to-peach-400 hover:from-peach-600 hover:to-peach-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Deal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Pipeline Value", value: `\u00a3${(totalPipeline / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-peach-600" },
          { label: "Avg Deal Size", value: `\u00a3${(avgDealSize / 1000).toFixed(0)}K`, icon: TrendingUp, color: "text-emerald-500" },
          { label: "Win Rate", value: `${winRate}%`, icon: Target, color: "text-amber-500" },
          { label: "Closing This Month", value: mockDeals.filter(d => d.expectedClose.startsWith("2026-03")).length.toString(), icon: Calendar, color: "text-violet-500" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-white border-warm-200/60">
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
              <div>
                <p className="text-xs text-warm-500">{stat.label}</p>
                <p className="text-xl font-bold text-warm-800">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-6 gap-3 overflow-x-auto">
        {stages.map((stage) => {
          const stageDeals = mockDeals.filter((d) => d.stage === stage.key);
          const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);
          return (
            <div key={stage.key} className="min-w-[200px]">
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                <h3 className="text-sm font-medium text-warm-800">{stage.label}</h3>
                <Badge variant="outline" className="border-warm-200 text-warm-500 text-[10px]">{stageDeals.length}</Badge>
              </div>
              <p className="text-xs text-warm-400 mb-3">{`\u00a3${(stageTotal / 1000).toFixed(0)}K total`}</p>
              <div className="space-y-2">
                {stageDeals.map((deal) => (
                  <Card key={deal.id} className="bg-white border-warm-200/60 hover:bg-peach-50/50 transition-colors cursor-pointer">
                    <CardContent className="p-3">
                      <p className="text-sm font-medium text-warm-800 truncate">{deal.title}</p>
                      <p className="text-xs text-warm-500 mt-1">{deal.company}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold text-emerald-600">{`\u00a3${deal.value.toLocaleString()}`}</span>
                        <span className="text-[10px] text-warm-400">{deal.probability}%</span>
                      </div>
                      <div className="w-full bg-warm-100 rounded-full h-1 mt-2">
                        <div className={`h-1 rounded-full ${stage.color}`} style={{ width: `${deal.probability}%` }} />
                      </div>
                      <p className="text-[10px] text-warm-400 mt-1">Close: {deal.expectedClose}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
