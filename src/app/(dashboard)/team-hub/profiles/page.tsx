"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCog, Pencil, Link, GitBranch, Globe, CircleDot } from "lucide-react";

const availabilityColors: Record<string, string> = {
  available: "text-emerald-500",
  busy: "text-amber-500",
  away: "text-warm-400",
};

const profiles = [
  {
    name: "Avais Ahmad Qarni", role: "CTO & Lead Data Engineer", bio: "12+ years designing large-scale data platforms. Expert in Azure, Databricks, and AI-assisted development.",
    skills: ["Azure Synapse", "Databricks", "PySpark", "Power BI", "Microsoft Fabric", "Python", "Claude AI"],
    specializations: ["Enterprise Data Platforms", "AI Automation", "Cloud Architecture"],
    availability: "available", linkedin: "#", github: "#", portfolio: "#",
  },
  {
    name: "Jehanzaib Hassan", role: "CEO & Director", bio: "Leading CODES AI Private Limited with vision in software engineering, electronics, and AI solutions.",
    skills: ["Business Strategy", "Electronics", "IoT", "Project Management"],
    specializations: ["Electronics Engineering", "Business Development", "Strategic Partnerships"],
    availability: "available", linkedin: "#", github: null, portfolio: null,
  },
  {
    name: "Sarah Mitchell", role: "HR Manager", bio: "Building teams and managing talent acquisition for AI-first companies.",
    skills: ["Recruitment", "Team Building", "Operations", "LinkedIn Sourcing"],
    specializations: ["Tech Recruitment", "Startup Operations", "HR Strategy"],
    availability: "busy", linkedin: "#", github: null, portfolio: null,
  },
  {
    name: "Omar Khalid", role: "Full Stack Developer", bio: "Building modern web applications with Next.js, React, and Node.js. Vibe coding enthusiast.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
    specializations: ["Frontend Architecture", "API Development", "UI/UX Implementation"],
    availability: "available", linkedin: "#", github: "#", portfolio: "#",
  },
  {
    name: "Lisa Chen", role: "AI Solutions Architect", bio: "Specialising in LLM integration, AI automation, and intelligent workflow design.",
    skills: ["Claude AI", "OpenAI", "LangChain", "Python", "Local LLMs", "RAG"],
    specializations: ["AI Integration", "Prompt Engineering", "ML Pipelines"],
    availability: "available", linkedin: "#", github: "#", portfolio: null,
  },
];

export default function ProfilesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <UserCog className="w-6 h-6 text-peach-500" /> Team Profiles
        </h1>
        <p className="text-warm-500 mt-1">AI Specialists & Data Engineering Team</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((profile) => (
          <Card key={profile.name} className="bg-white border-warm-200/60 hover:bg-warm-50 transition-colors shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-peach-500 to-peach-400 flex items-center justify-center text-white text-lg font-bold shrink-0">
                  {profile.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-warm-800">{profile.name}</h3>
                      <p className="text-xs text-peach-600">{profile.role}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CircleDot className={`w-3 h-3 ${availabilityColors[profile.availability]}`} />
                      <span className={`text-[10px] ${availabilityColors[profile.availability]}`}>{profile.availability}</span>
                    </div>
                  </div>
                  <p className="text-xs text-warm-500 mt-2">{profile.bio}</p>
                  <div className="mt-3">
                    <p className="text-[10px] text-warm-400 uppercase tracking-wider mb-1">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {profile.skills.map((s) => <Badge key={s} variant="outline" className="border-warm-200 text-warm-600 text-[10px]">{s}</Badge>)}
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-[10px] text-warm-400 uppercase tracking-wider mb-1">Specializations</p>
                    <div className="flex flex-wrap gap-1">
                      {profile.specializations.map((s) => <Badge key={s} variant="outline" className="border-peach-300/50 text-peach-600 text-[10px]">{s}</Badge>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    {profile.linkedin && <Button variant="ghost" size="sm" className="text-xs text-warm-500 hover:text-peach-500 p-1 h-auto"><Link className="w-3 h-3" /></Button>}
                    {profile.github && <Button variant="ghost" size="sm" className="text-xs text-warm-500 hover:text-warm-800 p-1 h-auto"><GitBranch className="w-3 h-3" /></Button>}
                    {profile.portfolio && <Button variant="ghost" size="sm" className="text-xs text-warm-500 hover:text-peach-500 p-1 h-auto"><Globe className="w-3 h-3" /></Button>}
                    <Button variant="ghost" size="sm" className="text-xs text-warm-500 hover:text-warm-800 p-1 h-auto ml-auto"><Pencil className="w-3 h-3" /></Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
