"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UsersRound, Plus, Pencil, Trash2, Link } from "lucide-react";

const teamMembers = [
  { id: "1", name: "Jehanzaib Hassan", title: "CEO & Director", department: "Management", skills: ["Business Strategy", "Leadership", "Electronics"], linkedin: "#" },
  { id: "2", name: "Avais Ahmad Qarni", title: "CTO & Lead Data Engineer", department: "Engineering", skills: ["Azure", "Databricks", "AI/ML", "Data Engineering", "Power BI"], linkedin: "#" },
  { id: "3", name: "Sarah Mitchell", title: "HR Manager", department: "Human Resources", skills: ["Recruitment", "Team Building", "Operations"], linkedin: "#" },
  { id: "4", name: "Omar Khalid", title: "Full Stack Developer", department: "Engineering", skills: ["React", "Next.js", "Node.js", "TypeScript"], linkedin: "#" },
  { id: "5", name: "Lisa Chen", title: "AI Solutions Architect", department: "Engineering", skills: ["Claude AI", "LLMs", "Python", "Automation"], linkedin: "#" },
];

export default function TeamManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <UsersRound className="w-6 h-6 text-peach-500" /> Team Management
          </h1>
          <p className="text-warm-500 mt-1">Manage team members displayed on the website</p>
        </div>
        <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white"><Plus className="w-4 h-4 mr-2" />Add Member</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="bg-white border-warm-200/60 hover:bg-warm-50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-peach-500 to-peach-400 flex items-center justify-center text-white font-bold">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warm-800">{member.name}</p>
                    <p className="text-xs text-peach-600">{member.title}</p>
                    <p className="text-[10px] text-warm-500">{member.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-warm-500 hover:text-warm-800"><Pencil className="w-3 h-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-warm-500 hover:text-red-500"><Trash2 className="w-3 h-3" /></Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-3">
                {member.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-warm-200 text-warm-600 text-[10px]">{skill}</Badge>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-xs text-warm-500 hover:text-peach-500 p-0">
                <Link className="w-3 h-3 mr-1" /> LinkedIn Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
