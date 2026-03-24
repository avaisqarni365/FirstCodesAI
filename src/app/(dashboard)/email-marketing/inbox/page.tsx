"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Inbox, Search, Star, Archive, Reply, Mail, Send, Bot, ArrowLeft } from "lucide-react";

const mockEmails = [
  { id: "1", from: "Sarah Chen <sarah@techcorp.co.uk>", to: "avaisi786@yahoo.com", subject: "Re: Azure Migration Proposal", preview: "Thank you for the detailed proposal. We've reviewed it internally and would like to proceed...", body: "Thank you for the detailed proposal. We've reviewed it internally and would like to proceed with Phase 1. Can we schedule a kickoff meeting for next week?\n\nBest regards,\nSarah Chen\nCTO, TechCorp Ltd", time: "10:30 AM", date: "Today", unread: true, direction: "INBOUND", isAiGenerated: false, starred: true },
  { id: "2", from: "Avais <avaisi786@yahoo.com>", to: "james@greenergy.uk", subject: "Cloud Migration - Architecture Overview", preview: "Hi James, as discussed, here's the high-level architecture for the Azure migration...", body: "Hi James,\n\nAs discussed, here's the high-level architecture for the Azure migration:\n\n1. Landing Zone: Azure Data Lake Gen2\n2. Processing: Databricks Delta Lake\n3. Serving: Azure Synapse SQL Pools\n4. Visualization: Power BI Premium\n\nI'll prepare detailed diagrams for our next meeting.\n\nBest,\nAvais", time: "9:15 AM", date: "Today", unread: false, direction: "OUTBOUND", isAiGenerated: true, starred: false },
  { id: "3", from: "Tom Roberts <tom@anglianwater.co.uk>", to: "avaisi786@yahoo.com", subject: "Data Platform - Budget Approval", preview: "Good news! The budget for the enterprise data platform project has been approved...", body: "Good news! The budget for the enterprise data platform project has been approved by the board. We can move forward with the \u00a385,000 proposal.\n\nPlease send over the contract and let's get started.\n\nBest,\nTom Roberts\nData Lead, Anglian Water", time: "Yesterday", date: "Mar 23", unread: true, direction: "INBOUND", isAiGenerated: false, starred: true },
  { id: "4", from: "Avais <avaisi786@yahoo.com>", to: "emily@dataflow.io", subject: "Introduction - CODES AI Private Limited", preview: "Dear Emily, I'm reaching out from CODES AI Private Limited to explore how we can help DataFlow...", body: "Dear Emily,\n\nI'm reaching out from CODES AI Private Limited to explore how we can help DataFlow Systems leverage AI and enterprise data solutions.\n\nWe specialize in Databricks Delta Lake and Azure platforms, with proven results across the data analytics industry.\n\nWould you be open to a brief call this week?\n\nBest regards,\nAvais Ahmad Qarni\nCODES AI Private Limited", time: "Yesterday", date: "Mar 23", unread: false, direction: "OUTBOUND", isAiGenerated: true, starred: false },
  { id: "5", from: "Priya Sharma <priya@innovateai.com>", to: "avaisi786@yahoo.com", subject: "AI Development Inquiry", preview: "Hi Avais, we saw your company profile and are interested in your AI development services...", body: "Hi Avais,\n\nWe saw your company profile and are interested in your AI development services. We're looking for a partner to help us integrate Claude AI into our existing platform.\n\nCould you share some case studies and pricing?\n\nThanks,\nPriya Sharma\nHead of AI, InnovateAI", time: "Mar 22", date: "Mar 22", unread: false, direction: "INBOUND", isAiGenerated: false, starred: false },
  { id: "6", from: "Avais <avaisi786@yahoo.com>", to: "peter@megaretail.com", subject: "SAP S/4HANA Integration Capabilities", preview: "Dear Peter, following up on our call about the SAP data integration requirements...", body: "Dear Peter,\n\nFollowing up on our call about the SAP data integration requirements. CODES AI Private Limited has extensive experience with SAP S/4HANA to Azure migrations, having delivered similar projects for organizations like Volkswagen.\n\nI'll prepare a technical proposal this week.\n\nBest,\nAvais", time: "Mar 22", date: "Mar 22", unread: false, direction: "OUTBOUND", isAiGenerated: false, starred: false },
  { id: "7", from: "Daniel Brown <dbrown@cloudnine.uk>", to: "avaisi786@yahoo.com", subject: "CRM Integration Requirements", preview: "Hi Avais, thanks for the call. Here are our Dynamics 365 integration requirements...", body: "Hi Avais,\n\nThanks for the call. Here are our Dynamics 365 integration requirements:\n\n1. Connect D365 Finance to our existing data warehouse\n2. Real-time sync for customer records\n3. Power BI dashboards for finance team\n\nPlease advise on timeline and budget.\n\nThanks,\nDaniel", time: "Mar 21", date: "Mar 21", unread: false, direction: "INBOUND", isAiGenerated: false, starred: false },
  { id: "8", from: "Avais <avaisi786@yahoo.com>", to: "priya@innovateai.com", subject: "Re: AI Development Inquiry", preview: "Hi Priya, thank you for your interest. I'd be happy to share our AI development portfolio...", body: "Hi Priya,\n\nThank you for your interest. I'd be happy to share our AI development portfolio.\n\nWe've integrated Claude and local LLMs into enterprise workflows, achieving:\n- 40% reduction in development time\n- Automated data pipeline generation\n- AI-powered code review and testing\n\nLet's schedule a call to discuss your specific needs.\n\nBest,\nAvais", time: "Mar 21", date: "Mar 21", unread: false, direction: "OUTBOUND", isAiGenerated: true, starred: false },
];

export default function InboxPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const selected = mockEmails.find((e) => e.id === selectedId);

  const filtered = mockEmails.filter((e) => {
    const matchesSearch = `${e.from} ${e.subject} ${e.preview}`.toLowerCase().includes(searchQuery.toLowerCase());
    if (filter === "unread") return matchesSearch && e.unread;
    if (filter === "sent") return matchesSearch && e.direction === "OUTBOUND";
    if (filter === "ai") return matchesSearch && e.isAiGenerated;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <Inbox className="w-6 h-6 text-peach-500" /> Inbox
        </h1>
        <p className="text-warm-500 mt-1">{mockEmails.filter((e) => e.unread).length} unread messages</p>
      </div>

      <div className="flex items-center gap-2">
        {["all", "unread", "sent", "ai"].map((f) => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)}
            className={filter === f ? "bg-peach-50 text-peach-600 border-peach-300/50" : "border-warm-200 text-warm-500 hover:bg-warm-50"}>
            {f === "all" ? "All" : f === "ai" ? "AI Generated" : f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-280px)]">
        {/* Email List */}
        <div className="lg:col-span-2 space-y-1 overflow-y-auto">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
            <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search emails..." className="pl-10 bg-warm-50 border-warm-200 text-warm-800" />
          </div>
          {filtered.map((email) => (
            <Card key={email.id} onClick={() => setSelectedId(email.id)}
              className={`cursor-pointer transition-colors ${selectedId === email.id ? "bg-peach-50/50 border-peach-300/50" : "bg-white border-warm-200/60 hover:bg-warm-50"}`}>
              <CardContent className="p-3">
                <div className="flex items-start gap-2">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${email.unread ? "bg-peach-500" : "bg-transparent"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${email.unread ? "font-semibold text-warm-800" : "text-warm-600"}`}>
                        {email.direction === "OUTBOUND" ? `To: ${email.to.split("<")[0]}` : email.from.split("<")[0]}
                      </p>
                      <span className="text-[10px] text-warm-400 shrink-0 ml-2">{email.time}</span>
                    </div>
                    <p className={`text-xs truncate mt-0.5 ${email.unread ? "text-warm-700" : "text-warm-500"}`}>{email.subject}</p>
                    <p className="text-[10px] text-warm-400 truncate mt-0.5">{email.preview}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {email.direction === "OUTBOUND" && <Send className="w-3 h-3 text-warm-400" />}
                      {email.isAiGenerated && <Bot className="w-3 h-3 text-peach-500" />}
                      {email.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Email View */}
        <Card className="lg:col-span-3 bg-white border-warm-200/60 overflow-y-auto">
          {selected ? (
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" size="sm" className="text-warm-500 lg:hidden" onClick={() => setSelectedId(null)}>
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-warm-400 hover:text-amber-500"><Star className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-warm-400 hover:text-peach-500"><Archive className="w-4 h-4" /></Button>
                </div>
              </div>
              <h2 className="text-lg font-semibold text-warm-800">{selected.subject}</h2>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm text-warm-500">From: <span className="text-warm-600">{selected.from}</span></p>
                {selected.isAiGenerated && <Badge variant="outline" className="border-peach-400/50 text-peach-600 text-[10px]"><Bot className="w-3 h-3 mr-1" />AI Generated</Badge>}
              </div>
              <p className="text-sm text-warm-500">To: {selected.to}</p>
              <p className="text-xs text-warm-400 mt-1">{selected.date} at {selected.time}</p>
              <div className="mt-6 p-4 rounded-lg bg-warm-50 whitespace-pre-wrap text-sm text-warm-700 leading-relaxed">
                {selected.body}
              </div>
              <div className="mt-4 flex items-center gap-3">
                <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white"><Reply className="w-4 h-4 mr-2" />Reply</Button>
                <Button variant="outline" className="border-warm-200 text-warm-600 hover:bg-warm-50"><Mail className="w-4 h-4 mr-2" />Forward</Button>
              </div>
            </CardContent>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center text-warm-400">
                <Mail className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Select an email to read</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
