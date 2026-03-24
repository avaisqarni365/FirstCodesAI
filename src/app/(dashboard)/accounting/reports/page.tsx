"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Download, TrendingUp, TrendingDown, DollarSign, Building2 } from "lucide-react";

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const revenue = [45000, 52000, 68000, 85000, 72000, 95000];
const expenses = [18000, 22000, 25000, 28000, 24000, 30000];
const maxVal = Math.max(...revenue);

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-peach-500" /> Financial Reports
          </h1>
          <p className="text-warm-500 mt-1">CODES AI Private Limited - FY 2025/26</p>
        </div>
        <Button variant="outline" className="border-warm-200 text-warm-600 hover:bg-warm-50"><Download className="w-4 h-4 mr-2" />Export PDF</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "\u00a3417K", change: "+23%", up: true, icon: TrendingUp, color: "text-emerald-500" },
          { label: "Total Expenses", value: "\u00a3147K", change: "+8%", up: true, icon: TrendingDown, color: "text-red-500" },
          { label: "Net Profit", value: "\u00a3270K", change: "+31%", up: true, icon: DollarSign, color: "text-blue-500" },
          { label: "Profit Margin", value: "64.7%", change: "+5%", up: true, icon: Building2, color: "text-peach-500" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-white border-warm-200/60">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-warm-500">{stat.label}</p>
                  <p className="text-xl font-bold text-warm-800 mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className={`text-xs mt-1 ${stat.up ? "text-emerald-500" : "text-red-500"}`}>{stat.change} vs last period</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="pnl">
        <TabsList className="bg-warm-50 border border-warm-200">
          <TabsTrigger value="pnl" className="data-[state=active]:bg-white text-warm-500 data-[state=active]:text-warm-800">Profit & Loss</TabsTrigger>
          <TabsTrigger value="vat" className="data-[state=active]:bg-white text-warm-500 data-[state=active]:text-warm-800">VAT Return</TabsTrigger>
          <TabsTrigger value="cashflow" className="data-[state=active]:bg-white text-warm-500 data-[state=active]:text-warm-800">Cash Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="pnl" className="mt-4 space-y-6">
          {/* Revenue vs Expenses Chart */}
          <Card className="bg-white border-warm-200/60">
            <CardHeader><CardTitle className="text-warm-800 text-sm">Revenue vs Expenses (6 months)</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 h-48">
                {months.map((month, i) => (
                  <div key={month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-1 items-end" style={{ height: "160px" }}>
                      <div className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t" style={{ height: `${(revenue[i] / maxVal) * 100}%` }} />
                      <div className="flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t" style={{ height: `${(expenses[i] / maxVal) * 100}%` }} />
                    </div>
                    <span className="text-[10px] text-warm-500">{month}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-6 mt-4">
                <span className="flex items-center gap-2 text-xs text-warm-500"><div className="w-3 h-3 rounded bg-emerald-500" />Revenue</span>
                <span className="flex items-center gap-2 text-xs text-warm-500"><div className="w-3 h-3 rounded bg-red-500" />Expenses</span>
              </div>
            </CardContent>
          </Card>

          {/* P&L Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-white border-warm-200/60">
              <CardHeader><CardTitle className="text-emerald-600 text-sm">Revenue Breakdown</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Data Engineering Services", amount: 185000 },
                  { label: "AI Development & Automation", amount: 95000 },
                  { label: "Cloud Consulting", amount: 72000 },
                  { label: "IoT & Electronics", amount: 38000 },
                  { label: "Web Development", amount: 18000 },
                  { label: "VoIP & Communications", amount: 9000 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <span className="text-sm text-warm-600">{item.label}</span>
                    <span className="text-sm font-medium text-warm-800">{"\u00a3"}{(item.amount / 1000).toFixed(0)}K</span>
                  </div>
                ))}
                <div className="border-t border-warm-200 pt-2 flex items-center justify-between font-bold">
                  <span className="text-sm text-emerald-600">Total Revenue</span>
                  <span className="text-sm text-warm-800">{"\u00a3"}417K</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-warm-200/60">
              <CardHeader><CardTitle className="text-red-500 text-sm">Expense Breakdown</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { label: "Cloud Infrastructure (Azure)", amount: 52000 },
                  { label: "Software Subscriptions", amount: 28000 },
                  { label: "Salaries & Contractors", amount: 35000 },
                  { label: "Marketing & Events", amount: 12000 },
                  { label: "Travel & Meetings", amount: 8000 },
                  { label: "Office & Utilities", amount: 12000 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1">
                    <span className="text-sm text-warm-600">{item.label}</span>
                    <span className="text-sm font-medium text-warm-800">{"\u00a3"}{(item.amount / 1000).toFixed(0)}K</span>
                  </div>
                ))}
                <div className="border-t border-warm-200 pt-2 flex items-center justify-between font-bold">
                  <span className="text-sm text-red-500">Total Expenses</span>
                  <span className="text-sm text-warm-800">{"\u00a3"}147K</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vat" className="mt-4">
          <Card className="bg-white border-warm-200/60">
            <CardHeader><CardTitle className="text-warm-800 text-sm">VAT Return - Q1 2026 (Jan-Mar)</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200/60">
                  <p className="text-xs text-warm-500">VAT Collected (Output)</p>
                  <p className="text-2xl font-bold text-emerald-600">{"\u00a3"}50,400</p>
                </div>
                <div className="p-4 rounded-lg bg-red-50 border border-red-200/60">
                  <p className="text-xs text-warm-500">VAT Paid (Input)</p>
                  <p className="text-2xl font-bold text-red-500">{"\u00a3"}16,400</p>
                </div>
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200/60">
                  <p className="text-xs text-warm-500">Net VAT Due to HMRC</p>
                  <p className="text-2xl font-bold text-blue-500">{"\u00a3"}34,000</p>
                </div>
              </div>
              <p className="text-xs text-warm-400">VAT Registration Number: GB XXXX XXXX XX | Standard Rate: 20% | Next filing deadline: 7 May 2026</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cashflow" className="mt-4">
          <Card className="bg-white border-warm-200/60">
            <CardHeader><CardTitle className="text-warm-800 text-sm">Cash Flow Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Opening Balance (Oct 2025)", amount: 125000, type: "neutral" },
                { label: "Cash In (Revenue)", amount: 417000, type: "in" },
                { label: "Cash Out (Expenses)", amount: -147000, type: "out" },
                { label: "VAT Payments", amount: -34000, type: "out" },
                { label: "Outstanding Receivables", amount: -142000, type: "pending" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-warm-200/60">
                  <span className="text-sm text-warm-600">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.type === "in" ? "text-emerald-500" : item.type === "out" ? "text-red-500" : item.type === "pending" ? "text-amber-500" : "text-warm-800"}`}>
                    {item.amount >= 0 ? "+" : ""}{"\u00a3"}{Math.abs(item.amount).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 font-bold text-lg">
                <span className="text-warm-800">Closing Balance</span>
                <span className="text-emerald-600">{"\u00a3"}219,000</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
