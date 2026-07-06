"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Rocket, Coins, CircleDollarSign, Layers, Clock, Mail, Building2, RefreshCw, Inbox, Trash2,
} from "lucide-react";

interface ProjectRequest {
  id: string;
  name: string | null;
  email: string | null;
  company: string | null;
  requirements: string;
  features: string[];
  complexity: string;
  estTokens: number;
  estPrice: number;
  estSprints: number;
  estWeeks: number;
  status: string;
  notes: string | null;
  createdAt: string;
}

const STATUSES = ["NEW", "REVIEWING", "QUOTED", "IN_BUILD", "DELIVERED", "DECLINED"];
const STATUS_STYLE: Record<string, string> = {
  NEW: "bg-peach-100 text-peach-700",
  REVIEWING: "bg-gold-100 text-gold-500",
  QUOTED: "bg-grape-100 text-grape-500",
  IN_BUILD: "bg-mint-100 text-mint-500",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  DECLINED: "bg-warm-100 text-warm-500",
};

export default function BuildRequestsPage() {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/studio-requests${filter ? `?status=${filter}` : ""}`);
      if (res.ok) setRequests(await res.json());
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  async function updateStatus(id: string, status: string) {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    await fetch(`/api/studio-requests/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function remove(id: string) {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    await fetch(`/api/studio-requests/${id}`, { method: "DELETE" });
  }

  const counts = STATUSES.reduce((acc, s) => {
    acc[s] = requests.filter((r) => r.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Rocket className="w-6 h-6 text-peach-500" /> Build Requests
          </h1>
          <p className="text-warm-500 mt-1">Incoming SparkVibe Studio build requests from the website</p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-2 text-sm text-warm-600 hover:text-peach-600 border border-warm-200 rounded-lg px-3 py-2 transition-colors">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter("")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${filter === "" ? "bg-peach-500 text-white border-peach-500" : "bg-white text-warm-600 border-warm-200 hover:border-peach-300"}`}>
          All ({requests.length})
        </button>
        {STATUSES.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${filter === s ? "bg-peach-500 text-white border-peach-500" : "bg-white text-warm-600 border-warm-200 hover:border-peach-300"}`}>
            {s.replace("_", " ")} {filter === "" && counts[s] ? `(${counts[s]})` : ""}
          </button>
        ))}
      </div>

      {loading && requests.length === 0 ? (
        <Card><CardContent className="py-16 text-center text-warm-500">Loading…</CardContent></Card>
      ) : requests.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Inbox className="w-10 h-10 text-warm-300 mx-auto mb-3" />
            <p className="text-warm-600 font-semibold">No build requests yet</p>
            <p className="text-warm-400 text-sm mt-1">Submissions from the SparkVibe Studio page will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => (
            <Card key={r.id} className="overflow-hidden">
              <CardContent className="p-5">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left: who + requirements */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge className={`${STATUS_STYLE[r.status] || "bg-warm-100 text-warm-600"} border-0`}>{r.status.replace("_", " ")}</Badge>
                      <span className="text-xs text-warm-400">{new Date(r.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-2">
                      <span className="font-bold text-warm-800">{r.name || "Anonymous"}</span>
                      {r.email && <a href={`mailto:${r.email}`} className="inline-flex items-center gap-1 text-peach-600 hover:underline"><Mail className="w-3.5 h-3.5" />{r.email}</a>}
                      {r.company && <span className="inline-flex items-center gap-1 text-warm-500"><Building2 className="w-3.5 h-3.5" />{r.company}</span>}
                    </div>
                    <pre className="text-xs text-warm-600 bg-warm-50 border border-warm-100 rounded-lg p-3 whitespace-pre-wrap font-mono max-h-40 overflow-auto">{r.requirements}</pre>
                    {r.features?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {r.features.map((f) => (
                          <span key={f} className="px-2 py-0.5 rounded-md bg-white border border-warm-200 text-[11px] text-warm-600">{f}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: estimate + actions */}
                  <div className="lg:w-64 shrink-0 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Est icon={Coins} label="Tokens" value={`${r.estTokens}k`} />
                      <Est icon={CircleDollarSign} label="Price" value={`£${r.estPrice.toLocaleString()}`} />
                      <Est icon={Layers} label="Sprints" value={`${r.estSprints}`} />
                      <Est icon={Clock} label="Weeks" value={`${r.estWeeks}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={r.status}
                        onChange={(e) => updateStatus(r.id, e.target.value)}
                        className="flex-1 text-xs rounded-lg border border-warm-200 bg-white px-2 py-2 text-warm-700 outline-none focus:border-peach-400"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                      </select>
                      <button onClick={() => remove(r.id)} className="p-2 rounded-lg border border-warm-200 text-warm-400 hover:text-red-500 hover:border-red-200 transition-colors" aria-label="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="block text-center text-[11px] text-warm-400 capitalize">{r.complexity} complexity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Est({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-warm-100 bg-warm-50 px-2.5 py-2">
      <p className="text-[9px] font-semibold text-warm-400 uppercase tracking-wider flex items-center gap-1"><Icon className="w-3 h-3" />{label}</p>
      <p className="text-sm font-bold text-warm-800">{value}</p>
    </div>
  );
}
