"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Plus, Search, Mail, Phone, MoreHorizontal, Filter } from "lucide-react";

const statusColors: Record<string, string> = {
  LEAD: "border-blue-300 text-blue-600 bg-blue-50",
  PROSPECT: "border-violet-300 text-violet-600 bg-violet-50",
  QUALIFIED: "border-amber-300 text-amber-600 bg-amber-50",
  CUSTOMER: "border-emerald-300 text-emerald-600 bg-emerald-50",
  CHURNED: "border-red-300 text-red-600 bg-red-50",
  INACTIVE: "border-warm-300 text-warm-500 bg-warm-50",
};

const mockContacts = [
  { id: "1", firstName: "Sarah", lastName: "Chen", email: "sarah@techcorp.co.uk", phone: "+447700900001", company: "TechCorp Ltd", jobTitle: "CTO", status: "CUSTOMER", source: "LinkedIn", owner: "Avais Ahmad Qarni" },
  { id: "2", firstName: "James", lastName: "Wilson", email: "james@greenergy.uk", phone: "+447700900002", company: "GreenEnergy UK", jobTitle: "VP Engineering", status: "QUALIFIED", source: "Companies House", owner: "Avais Ahmad Qarni" },
  { id: "3", firstName: "Emily", lastName: "Parker", email: "emily@dataflow.io", phone: "+447700900003", company: "DataFlow Systems", jobTitle: "Head of Data", status: "PROSPECT", source: "Referral", owner: "Jehanzaib Hassan" },
  { id: "4", firstName: "Mohammed", lastName: "Ali", email: "mali@smartfactory.com", phone: "+447700900004", company: "SmartFactory", jobTitle: "CEO", status: "LEAD", source: "Cold Outreach", owner: "Avais Ahmad Qarni" },
  { id: "5", firstName: "Rebecca", lastName: "Hughes", email: "r.hughes@vertex.co.uk", phone: "+447700900005", company: "Vertex Solutions", jobTitle: "Director", status: "CUSTOMER", source: "LinkedIn", owner: "Jehanzaib Hassan" },
  { id: "6", firstName: "Daniel", lastName: "Brown", email: "dbrown@cloudnine.uk", phone: "+447700900006", company: "CloudNine UK", jobTitle: "CIO", status: "LEAD", source: "Website", owner: "Avais Ahmad Qarni" },
  { id: "7", firstName: "Priya", lastName: "Sharma", email: "priya@innovateai.com", phone: "+447700900007", company: "InnovateAI", jobTitle: "Head of AI", status: "PROSPECT", source: "LinkedIn", owner: "Sarah Mitchell" },
  { id: "8", firstName: "Tom", lastName: "Roberts", email: "tom@anglianwater.co.uk", phone: "+447700900008", company: "Anglian Water", jobTitle: "Data Lead", status: "QUALIFIED", source: "Referral", owner: "Avais Ahmad Qarni" },
];

export default function ContactsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockContacts.filter((c) => {
    const matchesSearch = `${c.firstName} ${c.lastName} ${c.email} ${c.company}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-peach-600" />
            Contacts
          </h1>
          <p className="text-warm-500 mt-1">Manage your contacts and leads</p>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-gradient-to-r from-peach-500 to-peach-400 hover:from-peach-600 hover:to-peach-500 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-warm-200/60 text-warm-800">
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div><Label className="text-warm-600">First Name</Label><Input className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
              <div><Label className="text-warm-600">Last Name</Label><Input className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
              <div><Label className="text-warm-600">Email</Label><Input type="email" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
              <div><Label className="text-warm-600">Phone</Label><Input className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
              <div><Label className="text-warm-600">Company</Label><Input className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
              <div><Label className="text-warm-600">Job Title</Label><Input className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
              <div className="col-span-2">
                <Label className="text-warm-600">Status</Label>
                <Select defaultValue="LEAD">
                  <SelectTrigger className="mt-1 bg-warm-50 border-warm-200 text-warm-800"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-white border-warm-200">
                    {Object.keys(statusColors).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2"><Button className="w-full bg-gradient-to-r from-peach-500 to-peach-400 text-white">Save Contact</Button></div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <Input placeholder="Search contacts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-warm-50 border-warm-200 text-warm-800" />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
              <SelectTrigger className="w-48 bg-warm-50 border-warm-200 text-warm-800">
                <Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-white border-warm-200">
                <SelectItem value="all">All Statuses</SelectItem>
                {Object.keys(statusColors).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="bg-white border-warm-200/60">
        <CardHeader>
          <CardTitle className="text-warm-800 text-sm">
            {filtered.length} contacts found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Phone</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Company</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Source</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Owner</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact) => (
                  <tr key={contact.id} className="border-b border-warm-200/60 hover:bg-peach-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <p className="text-sm font-medium text-warm-800">{contact.firstName} {contact.lastName}</p>
                      <p className="text-xs text-warm-500">{contact.jobTitle}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-warm-600">{contact.email}</td>
                    <td className="py-3 px-4 text-sm text-warm-600">{contact.phone}</td>
                    <td className="py-3 px-4 text-sm text-warm-600">{contact.company}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={statusColors[contact.status]}>{contact.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-warm-500">{contact.source}</td>
                    <td className="py-3 px-4 text-sm text-warm-500">{contact.owner.split(" ")[0]}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-warm-400 hover:text-peach-600"><Mail className="w-3 h-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-warm-400 hover:text-emerald-600"><Phone className="w-3 h-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-warm-400 hover:text-warm-800"><MoreHorizontal className="w-3 h-3" /></Button>
                      </div>
                    </td>
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
