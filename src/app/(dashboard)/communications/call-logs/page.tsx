"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhoneCall, Search, Filter, Download, ArrowDownLeft, ArrowUpRight, Clock, FileText } from "lucide-react";

const statusColors: Record<string, string> = {
  COMPLETED: "border-emerald-500/50 text-emerald-600 bg-emerald-50",
  MISSED: "border-red-400/50 text-red-500 bg-red-50",
  VOICEMAIL: "border-amber-400/50 text-amber-600 bg-amber-50",
  FAILED: "border-warm-300 text-warm-500 bg-warm-50",
};

const mockCallLogs = [
  { id: "1", contact: "Sarah Chen", phone: "+447700900001", direction: "OUTBOUND", duration: 754, status: "COMPLETED", date: "2026-03-24 10:30", recording: true, notes: "Discussed Azure migration timeline" },
  { id: "2", contact: "Unknown", phone: "+447892456123", direction: "INBOUND", duration: 0, status: "MISSED", date: "2026-03-24 10:15", recording: false, notes: "" },
  { id: "3", contact: "Tom Roberts", phone: "+447700900008", direction: "OUTBOUND", duration: 525, status: "COMPLETED", date: "2026-03-24 09:00", recording: true, notes: "Contract signing follow-up" },
  { id: "4", contact: "James Wilson", phone: "+447700900002", direction: "INBOUND", duration: 922, status: "COMPLETED", date: "2026-03-23 16:00", recording: true, notes: "Cloud migration requirements" },
  { id: "5", contact: "Priya Sharma", phone: "+447700900007", direction: "OUTBOUND", duration: 0, status: "MISSED", date: "2026-03-23 14:00", recording: false, notes: "Left voicemail" },
  { id: "6", contact: "Mohammed Ali", phone: "+447700900004", direction: "INBOUND", duration: 370, status: "COMPLETED", date: "2026-03-23 11:00", recording: true, notes: "IoT project budget discussion" },
  { id: "7", contact: "Rebecca Hughes", phone: "+447700900005", direction: "OUTBOUND", duration: 295, status: "COMPLETED", date: "2026-03-22 15:30", recording: false, notes: "Invoice payment confirmation" },
  { id: "8", contact: "Daniel Brown", phone: "+447700900006", direction: "INBOUND", duration: 1083, status: "COMPLETED", date: "2026-03-22 14:00", recording: true, notes: "D365 CRM integration requirements" },
  { id: "9", contact: "Emily Parker", phone: "+447700900003", direction: "OUTBOUND", duration: 0, status: "VOICEMAIL", date: "2026-03-22 11:00", recording: true, notes: "Left message about DataFlow proposal" },
  { id: "10", contact: "CloudTech Partner", phone: "+447812345678", direction: "INBOUND", duration: 552, status: "COMPLETED", date: "2026-03-21 16:00", recording: true, notes: "Partnership discussion" },
  { id: "11", contact: "Sarah Chen", phone: "+447700900001", direction: "INBOUND", duration: 480, status: "COMPLETED", date: "2026-03-21 11:30", recording: true, notes: "Project scope clarification" },
  { id: "12", contact: "Unknown", phone: "+447555123456", direction: "INBOUND", duration: 0, status: "MISSED", date: "2026-03-21 09:15", recording: false, notes: "" },
  { id: "13", contact: "Jehanzaib Hassan", phone: "+447700900010", direction: "OUTBOUND", duration: 1200, status: "COMPLETED", date: "2026-03-20 17:00", recording: false, notes: "Weekly strategy call" },
  { id: "14", contact: "Tom Roberts", phone: "+447700900008", direction: "OUTBOUND", duration: 0, status: "FAILED", date: "2026-03-20 14:00", recording: false, notes: "Network issue" },
  { id: "15", contact: "Vertex Solutions", phone: "+447654321098", direction: "INBOUND", duration: 660, status: "COMPLETED", date: "2026-03-20 10:00", recording: true, notes: "New project inquiry" },
];

function formatDuration(seconds: number): string {
  if (seconds === 0) return "-";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function CallLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [directionFilter, setDirectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockCallLogs.filter((log) => {
    const matchesSearch = `${log.contact} ${log.phone}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDirection = directionFilter === "all" || log.direction === directionFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesDirection && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <PhoneCall className="w-6 h-6 text-peach-500" /> Call Logs
          </h1>
          <p className="text-warm-500 mt-1">{mockCallLogs.length} calls recorded</p>
        </div>
        <Button variant="outline" className="border-warm-200 text-warm-600">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search calls..." className="pl-10 bg-warm-50 border-warm-200 text-warm-800" />
            </div>
            <Select value={directionFilter} onValueChange={(v) => setDirectionFilter(v ?? "all")}>
              <SelectTrigger className="w-40 bg-warm-50 border-warm-200 text-warm-800"><SelectValue placeholder="Direction" /></SelectTrigger>
              <SelectContent className="bg-white border-warm-200">
                <SelectItem value="all">All Directions</SelectItem>
                <SelectItem value="INBOUND">Inbound</SelectItem>
                <SelectItem value="OUTBOUND">Outbound</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
              <SelectTrigger className="w-40 bg-warm-50 border-warm-200 text-warm-800"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent className="bg-white border-warm-200">
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="MISSED">Missed</SelectItem>
                <SelectItem value="VOICEMAIL">Voicemail</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-warm-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Contact</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Phone</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Direction</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Duration</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Date/Time</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Recording</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => (
                  <tr key={log.id} className="border-b border-warm-200/60 hover:bg-warm-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-warm-800">{log.contact}</td>
                    <td className="py-3 px-4 text-sm text-warm-600">{log.phone}</td>
                    <td className="py-3 px-4">
                      {log.direction === "INBOUND" ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-600"><ArrowDownLeft className="w-3 h-3" />Inbound</span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-peach-500"><ArrowUpRight className="w-3 h-3" />Outbound</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-warm-600 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-warm-400" />{formatDuration(log.duration)}
                    </td>
                    <td className="py-3 px-4"><Badge variant="outline" className={statusColors[log.status]}>{log.status}</Badge></td>
                    <td className="py-3 px-4 text-sm text-warm-500">{log.date}</td>
                    <td className="py-3 px-4">
                      {log.recording ? <Button variant="ghost" size="sm" className="text-peach-500 text-xs">Play</Button> : <span className="text-xs text-warm-400">-</span>}
                    </td>
                    <td className="py-3 px-4 text-xs text-warm-500 max-w-[200px] truncate">{log.notes || "-"}</td>
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
