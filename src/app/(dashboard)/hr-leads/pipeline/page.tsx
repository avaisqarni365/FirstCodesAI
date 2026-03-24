"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Building2, Users, Clock } from "lucide-react";

const stages = [
  { key: "IDENTIFIED", label: "Identified", color: "bg-warm-400" },
  { key: "RESEARCHING", label: "Researching", color: "bg-blue-500" },
  { key: "CONTACTED", label: "Contacted", color: "bg-violet-500" },
  { key: "RESPONDING", label: "Responding", color: "bg-amber-500" },
  { key: "MEETING_SCHEDULED", label: "Meeting", color: "bg-cyan-500" },
  { key: "PROPOSAL_SENT", label: "Proposal", color: "bg-pink-500" },
  { key: "NEGOTIATING", label: "Negotiating", color: "bg-orange-500" },
  { key: "WON", label: "Won", color: "bg-emerald-500" },
  { key: "LOST", label: "Lost", color: "bg-red-500" },
];

const pipelineCompanies = [
  { id: "1", name: "CloudNine UK", industry: "Cloud Computing", contacts: 1, lastActivity: "2 days ago", stage: "IDENTIFIED" },
  { id: "2", name: "InnovateAI", industry: "Artificial Intelligence", contacts: 2, lastActivity: "1 day ago", stage: "RESEARCHING" },
  { id: "3", name: "DataFlow Systems", industry: "Data Analytics", contacts: 1, lastActivity: "3 days ago", stage: "CONTACTED" },
  { id: "4", name: "SmartFactory", industry: "IoT & Manufacturing", contacts: 2, lastActivity: "Today", stage: "RESPONDING" },
  { id: "5", name: "TechCorp Ltd", industry: "Information Technology", contacts: 3, lastActivity: "Today", stage: "MEETING_SCHEDULED" },
  { id: "6", name: "GreenEnergy UK", industry: "Renewable Energy", contacts: 2, lastActivity: "1 day ago", stage: "PROPOSAL_SENT" },
  { id: "7", name: "Anglian Water", industry: "Utilities", contacts: 3, lastActivity: "Today", stage: "NEGOTIATING" },
  { id: "8", name: "Vertex Solutions", industry: "Software Development", contacts: 4, lastActivity: "5 days ago", stage: "WON" },
  { id: "9", name: "FinServe Ltd", industry: "Financial Services", contacts: 1, lastActivity: "2 weeks ago", stage: "LOST" },
  { id: "10", name: "AeroFlow Dynamics", industry: "Aerospace & IoT", contacts: 0, lastActivity: "1 day ago", stage: "IDENTIFIED" },
  { id: "11", name: "Nordic Data Systems", industry: "Data Engineering", contacts: 1, lastActivity: "3 days ago", stage: "RESEARCHING" },
];

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-peach-500" /> Company Pipeline
        </h1>
        <p className="text-warm-500 mt-1">Track companies through your sales pipeline</p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 flex-wrap">
        {stages.map((stage) => {
          const count = pipelineCompanies.filter((c) => c.stage === stage.key).length;
          return (
            <div key={stage.key} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-warm-200/60">
              <div className={`w-2 h-2 rounded-full ${stage.color}`} />
              <span className="text-xs text-warm-500">{stage.label}</span>
              <span className="text-xs font-bold text-warm-800">{count}</span>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageCompanies = pipelineCompanies.filter((c) => c.stage === stage.key);
          return (
            <div key={stage.key} className="min-w-[220px] flex-shrink-0">
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                <h3 className="text-xs font-semibold text-warm-800 uppercase tracking-wider">{stage.label}</h3>
                <Badge variant="outline" className="border-warm-200 text-warm-500 text-[10px] ml-auto">{stageCompanies.length}</Badge>
              </div>
              <div className="space-y-2 min-h-[200px] p-2 rounded-lg bg-warm-50/50 border border-dashed border-warm-200/60">
                {stageCompanies.map((company) => (
                  <Card key={company.id} className="bg-white border-warm-200/60 hover:bg-warm-50 transition-colors cursor-grab active:cursor-grabbing">
                    <CardContent className="p-3">
                      <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-warm-400 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-warm-800 truncate">{company.name}</p>
                          <p className="text-xs text-warm-500">{company.industry}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-warm-400 flex items-center gap-1">
                          <Users className="w-3 h-3" /> {company.contacts}
                        </span>
                        <span className="text-[10px] text-warm-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {company.lastActivity}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {stageCompanies.length === 0 && (
                  <p className="text-xs text-warm-300 text-center py-8">Drop here</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
