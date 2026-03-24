"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Building2,
  Handshake,
  Mail,
  Phone,
  Receipt,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Activity,
  DollarSign,
  Target,
} from "lucide-react";

const stats = [
  {
    title: "Total Contacts",
    value: "1,248",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    title: "Companies",
    value: "342",
    change: "+8%",
    trend: "up",
    icon: Building2,
    color: "bg-emerald-50 text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    title: "Active Deals",
    value: "56",
    change: "+23%",
    trend: "up",
    icon: Handshake,
    color: "bg-violet-50 text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    title: "Pipeline Value",
    value: "\u00a3284K",
    change: "+15%",
    trend: "up",
    icon: DollarSign,
    color: "bg-amber-50 text-amber-600",
    iconBg: "bg-amber-100",
  },
  {
    title: "Emails Sent",
    value: "3,421",
    change: "+34%",
    trend: "up",
    icon: Mail,
    color: "bg-pink-50 text-pink-600",
    iconBg: "bg-pink-100",
  },
  {
    title: "Calls Today",
    value: "18",
    change: "-5%",
    trend: "down",
    icon: Phone,
    color: "bg-cyan-50 text-cyan-600",
    iconBg: "bg-cyan-100",
  },
  {
    title: "Invoices Due",
    value: "12",
    change: "+2",
    trend: "up",
    icon: Receipt,
    color: "bg-orange-50 text-orange-600",
    iconBg: "bg-orange-100",
  },
  {
    title: "Win Rate",
    value: "68%",
    change: "+5%",
    trend: "up",
    icon: Target,
    color: "bg-green-50 text-green-600",
    iconBg: "bg-green-100",
  },
];

const recentActivities = [
  { type: "deal", text: "New deal 'Azure Data Platform' created", time: "2 min ago", icon: Handshake },
  { type: "email", text: "Campaign 'AI Services Q1' sent to 150 contacts", time: "15 min ago", icon: Mail },
  { type: "call", text: "Call with TechCorp Ltd completed (12 min)", time: "1 hr ago", icon: Phone },
  { type: "company", text: "Vertex Solutions added from Companies House", time: "2 hrs ago", icon: Building2 },
  { type: "contact", text: "Sarah Chen (CTO, DataFlow) added to pipeline", time: "3 hrs ago", icon: Users },
];

const topDeals = [
  { name: "Enterprise Data Platform", company: "Anglian Water", value: "\u00a385,000", stage: "Proposal", probability: 75 },
  { name: "AI Automation Suite", company: "TechCorp Ltd", value: "\u00a352,000", stage: "Negotiation", probability: 60 },
  { name: "Cloud Migration", company: "GreenEnergy UK", value: "\u00a345,000", stage: "Qualification", probability: 40 },
  { name: "IoT Dashboard", company: "SmartFactory", value: "\u00a338,000", stage: "Discovery", probability: 20 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-warm-800">Dashboard</h1>
        <p className="text-warm-500 mt-1">
          Welcome back. Here&apos;s what&apos;s happening at CODES AI.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white border-warm-200/60 hover:shadow-md hover:shadow-warm-100 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-warm-500 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-warm-800 mt-1">{stat.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color.split(" ")[1]}`} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {stat.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={`text-xs font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-red-500"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-warm-400">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-1 bg-white border-warm-200/60">
          <CardHeader>
            <CardTitle className="text-warm-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-peach-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-peach-50 flex items-center justify-center shrink-0">
                  <activity.icon className="w-4 h-4 text-peach-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-warm-700 truncate">{activity.text}</p>
                  <p className="text-xs text-warm-400 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Deals */}
        <Card className="lg:col-span-2 bg-white border-warm-200/60">
          <CardHeader>
            <CardTitle className="text-warm-800 flex items-center gap-2">
              <Handshake className="w-4 h-4 text-emerald-500" />
              Top Deals
            </CardTitle>
            <CardDescription className="text-warm-400">Active deals in your pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDeals.map((deal, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-warm-50 hover:bg-peach-50/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-warm-800 truncate">{deal.name}</p>
                    <p className="text-xs text-warm-400">{deal.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-warm-800">{deal.value}</p>
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${
                        deal.probability >= 60
                          ? "border-emerald-300 text-emerald-600 bg-emerald-50"
                          : deal.probability >= 40
                          ? "border-amber-300 text-amber-600 bg-amber-50"
                          : "border-warm-300 text-warm-500 bg-warm-50"
                      }`}
                    >
                      {deal.stage} ({deal.probability}%)
                    </Badge>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-warm-400 shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border-warm-200/60">
        <CardHeader>
          <CardTitle className="text-warm-800">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { label: "Add Contact", href: "/crm/contacts", icon: Users, color: "text-blue-500 bg-blue-50" },
              { label: "New Deal", href: "/crm/deals", icon: Handshake, color: "text-emerald-500 bg-emerald-50" },
              { label: "Search Companies", href: "/hr-leads/search", icon: Building2, color: "text-violet-500 bg-violet-50" },
              { label: "Compose Email", href: "/email-marketing/compose", icon: Mail, color: "text-pink-500 bg-pink-50" },
              { label: "Make Call", href: "/communications/voip", icon: Phone, color: "text-cyan-500 bg-cyan-50" },
              { label: "Create Invoice", href: "/accounting/invoices", icon: Receipt, color: "text-amber-500 bg-amber-50" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-warm-50 hover:bg-peach-50 hover:shadow-sm transition-all group border border-transparent hover:border-peach-200"
              >
                <div className={`w-10 h-10 rounded-xl ${action.color.split(" ")[1]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-5 h-5 ${action.color.split(" ")[0]}`} />
                </div>
                <span className="text-xs text-warm-500 group-hover:text-warm-700 transition-colors font-medium">{action.label}</span>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
