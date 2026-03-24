"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Plus, Phone, Mail, Calendar, FileText, CheckSquare, Clock } from "lucide-react";

const typeIcons: Record<string, { icon: React.ElementType; color: string }> = {
  CALL: { icon: Phone, color: "text-green-600 bg-green-50" },
  EMAIL: { icon: Mail, color: "text-blue-600 bg-blue-50" },
  MEETING: { icon: Calendar, color: "text-violet-600 bg-violet-50" },
  NOTE: { icon: FileText, color: "text-amber-600 bg-amber-50" },
  TASK: { icon: CheckSquare, color: "text-cyan-600 bg-cyan-50" },
  WHATSAPP: { icon: MessageSquare, color: "text-emerald-600 bg-emerald-50" },
};

const mockInteractions = [
  { id: "1", type: "CALL", subject: "Discovery call with TechCorp", description: "Discussed their data platform needs. They want Azure migration from on-prem SQL Server.", contact: "Sarah Chen", date: "2026-03-24 14:30", duration: 25 },
  { id: "2", type: "EMAIL", subject: "Proposal sent - Enterprise Data Platform", description: "Sent detailed proposal for Anglian Water data platform project. Waiting for feedback.", contact: "Tom Roberts", date: "2026-03-24 11:00", duration: null },
  { id: "3", type: "MEETING", subject: "Architecture review with GreenEnergy", description: "Reviewed cloud migration architecture. They approved the Azure Synapse approach.", contact: "James Wilson", date: "2026-03-24 09:00", duration: 60 },
  { id: "4", type: "WHATSAPP", subject: "Quick update on IoT project", description: "SmartFactory CEO confirmed budget approval for IoT dashboard project.", contact: "Mohammed Ali", date: "2026-03-23 17:45", duration: null },
  { id: "5", type: "NOTE", subject: "Competitive analysis - DataFlow deal", description: "DataFlow also talking to Snowflake partner. Need to emphasize our Databricks expertise.", contact: "Emily Parker", date: "2026-03-23 16:00", duration: null },
  { id: "6", type: "TASK", subject: "Prepare demo environment", description: "Set up Azure demo for Vertex Solutions presentation next week.", contact: "Rebecca Hughes", date: "2026-03-23 14:30", duration: null },
  { id: "7", type: "CALL", subject: "Follow-up call - CloudNine CRM", description: "Discussed CRM integration requirements. They need Dynamics 365 connector.", contact: "Daniel Brown", date: "2026-03-23 11:00", duration: 18 },
  { id: "8", type: "EMAIL", subject: "AI services introduction", description: "Sent our AI Development brochure to InnovateAI. Highlighted Claude integration capabilities.", contact: "Priya Sharma", date: "2026-03-22 15:30", duration: null },
  { id: "9", type: "MEETING", subject: "Team standup - Sprint planning", description: "Discussed Q2 priorities: AI automation, VoIP rollout, new website launch.", contact: "Internal", date: "2026-03-22 09:30", duration: 30 },
  { id: "10", type: "CALL", subject: "SAP integration requirements", description: "MegaRetail needs S/4HANA to Azure data pipeline. Complex but high value deal.", contact: "Peter Wang", date: "2026-03-21 16:00", duration: 35 },
  { id: "11", type: "WHATSAPP", subject: "Invoice confirmation", description: "Vertex Solutions confirmed receipt of invoice and processing payment this week.", contact: "Rebecca Hughes", date: "2026-03-21 12:00", duration: null },
  { id: "12", type: "EMAIL", subject: "Partnership proposal from CloudTech", description: "Received partnership inquiry from CloudTech for joint Azure consulting.", contact: "CloudTech Partner", date: "2026-03-21 09:00", duration: null },
];

export default function InteractionsPage() {
  const [filter, setFilter] = useState<string>("ALL");

  const filtered = filter === "ALL" ? mockInteractions : mockInteractions.filter((i) => i.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-violet-500" /> Interactions
          </h1>
          <p className="text-warm-500 mt-1">Activity timeline and interaction history</p>
        </div>
        <Button className="bg-gradient-to-r from-peach-500 to-peach-400 hover:from-peach-600 hover:to-peach-500 text-white">
          <Plus className="w-4 h-4 mr-2" /> Log Interaction
        </Button>
      </div>

      {/* Type Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {["ALL", "CALL", "EMAIL", "MEETING", "NOTE", "TASK", "WHATSAPP"].map((type) => (
          <Button
            key={type}
            variant={filter === type ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(type)}
            className={filter === type ? "bg-peach-50 text-peach-600 border-peach-300" : "border-warm-200 text-warm-500 hover:text-warm-800"}
          >
            {type === "ALL" ? "All" : type.charAt(0) + type.slice(1).toLowerCase()}
          </Button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-warm-200" />
        <div className="space-y-4">
          {filtered.map((interaction) => {
            const typeInfo = typeIcons[interaction.type];
            const Icon = typeInfo.icon;
            return (
              <Card key={interaction.id} className="bg-white border-warm-200/60 ml-12 relative hover:bg-peach-50/30 transition-colors">
                <div className={`absolute -left-12 top-4 w-8 h-8 rounded-full flex items-center justify-center ${typeInfo.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-warm-800">{interaction.subject}</p>
                        <Badge variant="outline" className="border-warm-200 text-warm-500 text-[10px]">{interaction.type}</Badge>
                      </div>
                      <p className="text-sm text-warm-500 mt-1">{interaction.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-warm-400">Contact: {interaction.contact}</span>
                        {interaction.duration && (
                          <span className="text-xs text-warm-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {interaction.duration} min
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-warm-400 shrink-0 ml-4">{interaction.date}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
