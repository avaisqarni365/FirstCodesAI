"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wallet, Plus, Filter } from "lucide-react";

const statusColors: Record<string, string> = {
  PENDING: "border-amber-500/50 text-amber-500",
  APPROVED: "border-emerald-500/50 text-emerald-600",
  REJECTED: "border-red-500/50 text-red-500",
  REIMBURSED: "border-blue-500/50 text-blue-500",
};

const mockExpenses = [
  { id: "1", description: "Claude API Credits", category: "Software", amount: 450.00, date: "2026-03-20", vendor: "Anthropic", status: "APPROVED", receipt: true },
  { id: "2", description: "Azure Cloud Services - March", category: "Software", amount: 1250.00, date: "2026-03-15", vendor: "Microsoft", status: "APPROVED", receipt: true },
  { id: "3", description: "Cursor Pro Subscription", category: "Software", amount: 20.00, date: "2026-03-01", vendor: "Cursor", status: "APPROVED", receipt: true },
  { id: "4", description: "London-Birmingham Train", category: "Travel", amount: 85.50, date: "2026-03-18", vendor: "Avanti West Coast", status: "PENDING", receipt: true },
  { id: "5", description: "Client Lunch - TechCorp", category: "Marketing", amount: 125.00, date: "2026-03-22", vendor: "The Ivy", status: "PENDING", receipt: true },
  { id: "6", description: "Twilio VoIP Credits", category: "Software", amount: 75.00, date: "2026-03-10", vendor: "Twilio", status: "APPROVED", receipt: true },
  { id: "7", description: "Office Supplies", category: "Office", amount: 45.99, date: "2026-03-05", vendor: "Amazon", status: "APPROVED", receipt: true },
  { id: "8", description: "Domain Renewal - codes-ai.uk", category: "Software", amount: 35.00, date: "2026-03-01", vendor: "Cloudflare", status: "APPROVED", receipt: true },
  { id: "9", description: "USB-C Hub & Cables", category: "Hardware", amount: 89.99, date: "2026-02-28", vendor: "Amazon", status: "APPROVED", receipt: true },
  { id: "10", description: "Kimi Pro Subscription", category: "Software", amount: 15.00, date: "2026-03-01", vendor: "Moonshot AI", status: "APPROVED", receipt: true },
  { id: "11", description: "Business Insurance", category: "Utilities", amount: 350.00, date: "2026-03-01", vendor: "Hiscox", status: "APPROVED", receipt: true },
  { id: "12", description: "Conference Ticket - AI Summit London", category: "Marketing", amount: 299.00, date: "2026-03-24", vendor: "AI Summit", status: "PENDING", receipt: false },
];

export default function ExpensesPage() {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockExpenses.filter((e) => {
    const matchesCat = categoryFilter === "all" || e.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesCat && matchesStatus;
  });

  const total = filtered.reduce((s, e) => s + e.amount, 0);
  const categories = [...new Set(mockExpenses.map((e) => e.category))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Wallet className="w-6 h-6 text-peach-500" /> Expenses
          </h1>
          <p className="text-warm-500 mt-1">Total: {"\u00a3"}{total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</p>
        </div>
        <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white"><Plus className="w-4 h-4 mr-2" />Add Expense</Button>
      </div>

      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-4 flex items-center gap-4 flex-wrap">
          <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "all")}>
            <SelectTrigger className="w-44 bg-warm-50 border-warm-200 text-warm-800"><Filter className="w-4 h-4 mr-2" /><SelectValue /></SelectTrigger>
            <SelectContent className="bg-white border-warm-200">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
            <SelectTrigger className="w-44 bg-warm-50 border-warm-200 text-warm-800"><SelectValue /></SelectTrigger>
            <SelectContent className="bg-white border-warm-200">
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.keys(statusColors).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Description</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Category</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-warm-500 uppercase">Amount</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Vendor</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((exp) => (
                  <tr key={exp.id} className="border-b border-warm-200/60 hover:bg-peach-50/50 transition-colors">
                    <td className="py-3 px-4 text-sm text-warm-800">{exp.description}</td>
                    <td className="py-3 px-4"><Badge variant="outline" className="border-warm-200 text-warm-600 text-[10px]">{exp.category}</Badge></td>
                    <td className="py-3 px-4 text-sm font-semibold text-warm-800 text-right">{"\u00a3"}{exp.amount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-sm text-warm-500">{exp.date}</td>
                    <td className="py-3 px-4 text-sm text-warm-500">{exp.vendor}</td>
                    <td className="py-3 px-4"><Badge variant="outline" className={statusColors[exp.status]}>{exp.status}</Badge></td>
                    <td className="py-3 px-4">{exp.receipt ? <span className="text-xs text-emerald-500">Attached</span> : <span className="text-xs text-warm-400">Missing</span>}</td>
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
