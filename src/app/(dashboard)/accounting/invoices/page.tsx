"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Receipt, Plus, DollarSign, AlertTriangle, CheckCircle, FileText } from "lucide-react";

const statusColors: Record<string, string> = {
  DRAFT: "border-warm-400/50 text-warm-500",
  SENT: "border-blue-500/50 text-blue-500",
  VIEWED: "border-violet-500/50 text-violet-500",
  PAID: "border-emerald-500/50 text-emerald-600",
  OVERDUE: "border-red-500/50 text-red-500",
  CANCELLED: "border-warm-400/50 text-warm-400",
};

const mockInvoices = [
  { id: "1", number: "INV-2026-001", client: "Anglian Water", email: "finance@anglianwater.co.uk", issueDate: "2026-03-01", dueDate: "2026-03-31", subtotal: 70833.33, vat: 14166.67, total: 85000.00, status: "SENT", currency: "GBP" },
  { id: "2", number: "INV-2026-002", client: "TechCorp Ltd", email: "accounts@techcorp.co.uk", issueDate: "2026-02-15", dueDate: "2026-03-15", subtotal: 43333.33, vat: 8666.67, total: 52000.00, status: "OVERDUE", currency: "GBP" },
  { id: "3", number: "INV-2026-003", client: "Vertex Solutions", email: "billing@vertex.co.uk", issueDate: "2026-03-10", dueDate: "2026-04-10", subtotal: 23333.33, vat: 4666.67, total: 28000.00, status: "PAID", currency: "GBP" },
  { id: "4", number: "INV-2026-004", client: "GreenEnergy UK", email: "finance@greenergy.uk", issueDate: "2026-03-15", dueDate: "2026-04-15", subtotal: 37500.00, vat: 7500.00, total: 45000.00, status: "SENT", currency: "GBP" },
  { id: "5", number: "INV-2026-005", client: "SmartFactory", email: "ap@smartfactory.com", issueDate: "2026-03-20", dueDate: "2026-04-20", subtotal: 31666.67, vat: 6333.33, total: 38000.00, status: "DRAFT", currency: "GBP" },
  { id: "6", number: "INV-2026-006", client: "DataFlow Systems", email: "finance@dataflow.io", issueDate: "2026-03-22", dueDate: "2026-04-22", subtotal: 60000.00, vat: 12000.00, total: 72000.00, status: "DRAFT", currency: "GBP" },
  { id: "7", number: "INV-2025-048", client: "MegaRetail", email: "accounts@megaretail.com", issueDate: "2026-01-10", dueDate: "2026-02-10", subtotal: 79166.67, vat: 15833.33, total: 95000.00, status: "PAID", currency: "GBP" },
  { id: "8", number: "INV-2025-047", client: "CloudNine UK", email: "billing@cloudnine.uk", issueDate: "2026-02-01", dueDate: "2026-03-01", subtotal: 15000.00, vat: 3000.00, total: 18000.00, status: "PAID", currency: "GBP" },
  { id: "9", number: "INV-2025-046", client: "InnovateAI", email: "finance@innovateai.com", issueDate: "2026-02-20", dueDate: "2026-03-20", subtotal: 10000.00, vat: 2000.00, total: 12000.00, status: "VIEWED", currency: "GBP" },
  { id: "10", number: "INV-2025-045", client: "FinServe Ltd", email: "ap@finserve.co.uk", issueDate: "2025-12-15", dueDate: "2026-01-15", subtotal: 18333.33, vat: 3666.67, total: 22000.00, status: "CANCELLED", currency: "GBP" },
];

export default function InvoicesPage() {
  const outstanding = mockInvoices.filter(i => i.status === "SENT" || i.status === "VIEWED").reduce((s, i) => s + i.total, 0);
  const overdue = mockInvoices.filter(i => i.status === "OVERDUE").reduce((s, i) => s + i.total, 0);
  const paidThisMonth = mockInvoices.filter(i => i.status === "PAID" && i.issueDate.startsWith("2026-03")).reduce((s, i) => s + i.total, 0);
  const drafts = mockInvoices.filter(i => i.status === "DRAFT").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Receipt className="w-6 h-6 text-peach-500" /> Invoices
          </h1>
          <p className="text-warm-500 mt-1">CODES AI Private Limited</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white"><Plus className="w-4 h-4 mr-2" />Create Invoice</Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-warm-200/60 text-warm-800 max-w-lg">
            <DialogHeader><DialogTitle>Create Invoice</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div><Label className="text-warm-600">Client Name</Label><Input className="mt-1 bg-warm-50 border-warm-200 text-warm-800" placeholder="Company name" /></div>
              <div><Label className="text-warm-600">Client Email</Label><Input className="mt-1 bg-warm-50 border-warm-200 text-warm-800" placeholder="finance@company.com" /></div>
              <div className="border border-warm-200 rounded-lg p-3 space-y-2">
                <Label className="text-warm-600 text-sm">Line Items</Label>
                <div className="grid grid-cols-12 gap-2 text-xs text-warm-500"><span className="col-span-6">Description</span><span className="col-span-2">Qty</span><span className="col-span-2">Rate</span><span className="col-span-2">Total</span></div>
                <div className="grid grid-cols-12 gap-2">
                  <Input className="col-span-6 bg-warm-50 border-warm-200 text-warm-800 text-sm" placeholder="Service description" />
                  <Input className="col-span-2 bg-warm-50 border-warm-200 text-warm-800 text-sm" placeholder="1" />
                  <Input className="col-span-2 bg-warm-50 border-warm-200 text-warm-800 text-sm" placeholder="0.00" />
                  <div className="col-span-2 flex items-center text-sm text-warm-600">{"\u00a3"}0.00</div>
                </div>
                <Button variant="outline" size="sm" className="border-warm-200 text-warm-500 text-xs"><Plus className="w-3 h-3 mr-1" />Add Line</Button>
              </div>
              <div className="text-right space-y-1 text-sm">
                <p className="text-warm-500">Subtotal: <span className="text-warm-800">{"\u00a3"}0.00</span></p>
                <p className="text-warm-500">VAT (20%): <span className="text-warm-800">{"\u00a3"}0.00</span></p>
                <p className="text-lg font-bold text-warm-800">Total: {"\u00a3"}0.00</p>
              </div>
              <Button className="w-full bg-gradient-to-r from-peach-500 to-peach-400 text-white">Create Invoice</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: "Outstanding", value: `\u00a3${(outstanding / 1000).toFixed(0)}K`, icon: DollarSign, color: "text-blue-500" },
          { label: "Overdue", value: `\u00a3${(overdue / 1000).toFixed(0)}K`, icon: AlertTriangle, color: "text-red-500" },
          { label: "Paid This Month", value: `\u00a3${(paidThisMonth / 1000).toFixed(0)}K`, icon: CheckCircle, color: "text-emerald-500" },
          { label: "Draft Invoices", value: drafts.toString(), icon: FileText, color: "text-warm-500" },
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

      {/* Table */}
      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Invoice #</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Client</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Issue Date</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Due Date</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-warm-500 uppercase">Subtotal</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-warm-500 uppercase">VAT</th>
                  <th className="text-right py-3 px-4 text-xs font-medium text-warm-500 uppercase">Total</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-warm-200/60 hover:bg-peach-50/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-peach-600">{inv.number}</td>
                    <td className="py-3 px-4"><p className="text-sm text-warm-800">{inv.client}</p><p className="text-[10px] text-warm-500">{inv.email}</p></td>
                    <td className="py-3 px-4 text-sm text-warm-500">{inv.issueDate}</td>
                    <td className="py-3 px-4 text-sm text-warm-500">{inv.dueDate}</td>
                    <td className="py-3 px-4 text-sm text-warm-600 text-right">{"\u00a3"}{inv.subtotal.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 px-4 text-sm text-warm-500 text-right">{"\u00a3"}{inv.vat.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-warm-800 text-right">{"\u00a3"}{inv.total.toLocaleString("en-GB", { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 px-4"><Badge variant="outline" className={statusColors[inv.status]}>{inv.status}</Badge></td>
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
