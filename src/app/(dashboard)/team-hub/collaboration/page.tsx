"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UsersRound, Calendar, MessageSquare, CheckCircle, Clock, Circle } from "lucide-react";

const projects = [
  { name: "Anglian Water Data Platform", members: ["AAQ", "JH"], status: "In Progress", progress: 65, deadline: "2026-04-30" },
  { name: "TechCorp AI Automation", members: ["AAQ", "LC"], status: "In Progress", progress: 30, deadline: "2026-05-15" },
  { name: "SmartFactory IoT Dashboard", members: ["AAQ", "OK"], status: "Planning", progress: 10, deadline: "2026-06-30" },
  { name: "CODES AI Website Redesign", members: ["OK", "LC"], status: "Completed", progress: 100, deadline: "2026-03-20" },
];

const taskBoard = {
  todo: [
    { title: "Set up Twilio VoIP integration", assignee: "OK", priority: "medium" },
    { title: "Design email template system", assignee: "LC", priority: "low" },
    { title: "Companies House API integration", assignee: "AAQ", priority: "high" },
  ],
  inProgress: [
    { title: "Build CRM contact import", assignee: "OK", priority: "high" },
    { title: "Power BI dashboard for client", assignee: "AAQ", priority: "high" },
    { title: "WhatsApp Business API setup", assignee: "LC", priority: "medium" },
  ],
  done: [
    { title: "NextAuth authentication", assignee: "OK", priority: "high" },
    { title: "Database schema design", assignee: "AAQ", priority: "high" },
    { title: "Dashboard layout & navigation", assignee: "OK", priority: "medium" },
  ],
};

const priorityColors: Record<string, string> = {
  high: "border-red-400/50 text-red-500",
  medium: "border-amber-400/50 text-amber-500",
  low: "border-warm-300/50 text-warm-500",
};

const statusColors: Record<string, string> = {
  "In Progress": "border-peach-400/50 text-peach-600",
  Planning: "border-amber-400/50 text-amber-500",
  Completed: "border-emerald-400/50 text-emerald-600",
};

const messages = [
  { from: "AAQ", text: "Pipeline for Anglian Water is running at 99.9% accuracy now", time: "10:30 AM" },
  { from: "JH", text: "Great work! Let's present to the client this week", time: "10:35 AM" },
  { from: "OK", text: "CRM module is ready for review. PR submitted.", time: "11:00 AM" },
  { from: "LC", text: "AI email generator integrated with Claude API. Testing now.", time: "11:15 AM" },
  { from: "AAQ", text: "Everyone: team standup at 3pm. Agenda: Q2 sprint planning", time: "11:30 AM" },
];

export default function CollaborationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <UsersRound className="w-6 h-6 text-peach-500" /> Team Collaboration
        </h1>
        <p className="text-warm-500 mt-1">Projects, tasks, and team communication</p>
      </div>

      {/* Projects */}
      <Card className="bg-white border-warm-200/60 shadow-sm">
        <CardHeader><CardTitle className="text-warm-800 text-sm">Active Projects</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {projects.map((project) => (
            <div key={project.name} className="p-3 rounded-lg bg-warm-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-medium text-warm-800">{project.name}</h3>
                  <Badge variant="outline" className={statusColors[project.status]}>{project.status}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.members.map((m) => (
                      <div key={m} className="w-6 h-6 rounded-full bg-gradient-to-br from-peach-500 to-peach-400 flex items-center justify-center text-[9px] text-white font-bold border-2 border-white">
                        {m}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-warm-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{project.deadline}</span>
                </div>
              </div>
              <Progress value={project.progress} className="h-1.5" />
              <p className="text-[10px] text-warm-400 mt-1">{project.progress}% complete</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Task Board */}
        {(["todo", "inProgress", "done"] as const).map((column) => {
          const title = column === "todo" ? "To Do" : column === "inProgress" ? "In Progress" : "Done";
          const icon = column === "todo" ? Circle : column === "inProgress" ? Clock : CheckCircle;
          const Icon = icon;
          const color = column === "todo" ? "text-warm-500" : column === "inProgress" ? "text-peach-500" : "text-emerald-500";
          return (
            <Card key={column} className="bg-white border-warm-200/60 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-warm-800 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${color}`} /> {title}
                  <Badge variant="outline" className="border-warm-200 text-warm-500 text-[10px] ml-auto">{taskBoard[column].length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {taskBoard[column].map((task, i) => (
                  <div key={i} className="p-2 rounded bg-warm-50 hover:bg-peach-50/50 transition-colors">
                    <p className="text-xs text-warm-800">{task.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-peach-500 to-peach-400 flex items-center justify-center text-[8px] text-white font-bold">{task.assignee}</div>
                      <Badge variant="outline" className={`${priorityColors[task.priority]} text-[9px]`}>{task.priority}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Team Chat */}
      <Card className="bg-white border-warm-200/60 shadow-sm">
        <CardHeader><CardTitle className="text-warm-800 text-sm flex items-center gap-2"><MessageSquare className="w-4 h-4 text-emerald-500" />Team Chat</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-peach-500 to-peach-400 flex items-center justify-center text-[9px] text-white font-bold shrink-0">{msg.from}</div>
              <div className="flex-1">
                <p className="text-sm text-warm-600">{msg.text}</p>
                <p className="text-[10px] text-warm-400 mt-0.5">{msg.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
