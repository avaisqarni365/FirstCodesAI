"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Plus, Mail, Eye, Reply, BarChart3 } from "lucide-react";

const statusColors: Record<string, string> = {
  DRAFT: "border-warm-400/50 text-warm-500",
  SCHEDULED: "border-blue-400/50 text-blue-500",
  SENDING: "border-amber-400/50 text-amber-500",
  SENT: "border-emerald-400/50 text-emerald-500",
  PAUSED: "border-orange-400/50 text-orange-500",
};

const mockCampaigns = [
  { id: "1", name: "AI Services Introduction - Q1 2026", subject: "Transform Your Business with AI", status: "SENT", sentCount: 150, openCount: 87, replyCount: 23, scheduledAt: "2026-03-01" },
  { id: "2", name: "Data Engineering Capabilities", subject: "Enterprise Data Platforms Built Right", status: "SENT", sentCount: 95, openCount: 52, replyCount: 14, scheduledAt: "2026-02-15" },
  { id: "3", name: "Spring Follow-up Sequence", subject: "Following up on our conversation", status: "SENDING", sentCount: 45, openCount: 12, replyCount: 3, scheduledAt: "2026-03-24" },
  { id: "4", name: "IoT Solutions for Manufacturing", subject: "Real-time IoT Analytics for Your Factory", status: "SCHEDULED", sentCount: 0, openCount: 0, replyCount: 0, scheduledAt: "2026-04-01" },
  { id: "5", name: "Partnership Outreach", subject: "Let's Build Something Great Together", status: "DRAFT", sentCount: 0, openCount: 0, replyCount: 0, scheduledAt: null },
  { id: "6", name: "Cloud Migration Case Study", subject: "How We Saved 40% on Cloud Costs", status: "SENT", sentCount: 200, openCount: 118, replyCount: 31, scheduledAt: "2026-01-20" },
];

export default function CampaignsPage() {
  const totalSent = mockCampaigns.reduce((s, c) => s + c.sentCount, 0);
  const totalOpened = mockCampaigns.reduce((s, c) => s + c.openCount, 0);
  const totalReplied = mockCampaigns.reduce((s, c) => s + c.replyCount, 0);
  const avgOpenRate = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;
  const avgReplyRate = totalSent > 0 ? Math.round((totalReplied / totalSent) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Send className="w-6 h-6 text-peach-500" /> Campaigns
          </h1>
          <p className="text-warm-500 mt-1">Manage your email marketing campaigns</p>
        </div>
        <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white">
          <Plus className="w-4 h-4 mr-2" /> Create Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Campaigns", value: mockCampaigns.length.toString(), icon: Mail, color: "text-peach-500" },
          { label: "Avg Open Rate", value: `${avgOpenRate}%`, icon: Eye, color: "text-emerald-500" },
          { label: "Avg Reply Rate", value: `${avgReplyRate}%`, icon: Reply, color: "text-violet-500" },
          { label: "Active", value: mockCampaigns.filter(c => c.status === "SENDING" || c.status === "SCHEDULED").length.toString(), icon: BarChart3, color: "text-amber-500" },
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

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCampaigns.map((campaign) => (
          <Card key={campaign.id} className="bg-white border-warm-200/60 hover:bg-warm-50 transition-colors cursor-pointer">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={statusColors[campaign.status]}>{campaign.status}</Badge>
                {campaign.scheduledAt && <span className="text-xs text-warm-500">{campaign.scheduledAt}</span>}
              </div>
              <CardTitle className="text-sm text-warm-800 mt-2">{campaign.name}</CardTitle>
              <p className="text-xs text-warm-500">{campaign.subject}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded bg-warm-50">
                  <p className="text-lg font-bold text-warm-800">{campaign.sentCount}</p>
                  <p className="text-[10px] text-warm-500">Sent</p>
                </div>
                <div className="text-center p-2 rounded bg-warm-50">
                  <p className="text-lg font-bold text-emerald-500">{campaign.openCount}</p>
                  <p className="text-[10px] text-warm-500">Opened</p>
                </div>
                <div className="text-center p-2 rounded bg-warm-50">
                  <p className="text-lg font-bold text-peach-500">{campaign.replyCount}</p>
                  <p className="text-[10px] text-warm-500">Replied</p>
                </div>
              </div>
              {campaign.sentCount > 0 && (
                <div className="w-full bg-warm-100 rounded-full h-1.5 mt-3">
                  <div className="h-1.5 rounded-full bg-gradient-to-r from-peach-500 to-peach-400" style={{ width: `${(campaign.openCount / campaign.sentCount) * 100}%` }} />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
