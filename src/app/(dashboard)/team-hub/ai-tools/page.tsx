"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, ExternalLink, Check, Plug } from "lucide-react";

const categories = ["All", "Coding", "Data", "Design", "Testing", "Deployment"];

const aiTools = [
  { name: "Claude (Anthropic)", category: "Coding", description: "Advanced AI assistant for code generation, analysis, and complex reasoning", integrated: true, website: "#" },
  { name: "Cursor", category: "Coding", description: "AI-first code editor with deep codebase understanding", integrated: true, website: "#" },
  { name: "GitHub Copilot", category: "Coding", description: "AI pair programmer for code completions and suggestions", integrated: false, website: "#" },
  { name: "Kimi (Moonshot)", category: "Coding", description: "2M token context window for large codebase analysis", integrated: true, website: "#" },
  { name: "Databricks", category: "Data", description: "Unified data analytics platform with Delta Lake", integrated: true, website: "#" },
  { name: "Snowflake", category: "Data", description: "Cloud data warehouse for structured and semi-structured data", integrated: false, website: "#" },
  { name: "Microsoft Fabric", category: "Data", description: "End-to-end analytics platform with OneLake", integrated: true, website: "#" },
  { name: "Power BI", category: "Data", description: "Business intelligence dashboards and visualization", integrated: true, website: "#" },
  { name: "Figma AI", category: "Design", description: "AI-powered design tools for rapid prototyping", integrated: false, website: "#" },
  { name: "Midjourney", category: "Design", description: "AI image generation for marketing and design assets", integrated: false, website: "#" },
  { name: "v0 (Vercel)", category: "Design", description: "AI-generated React components from descriptions", integrated: true, website: "#" },
  { name: "Meticulous", category: "Testing", description: "AI-powered visual regression testing", integrated: false, website: "#" },
  { name: "QA Wolf", category: "Testing", description: "AI-generated end-to-end test suites", integrated: false, website: "#" },
  { name: "Vercel", category: "Deployment", description: "Zero-config deployment for Next.js applications", integrated: true, website: "#" },
  { name: "Replit", category: "Deployment", description: "AI-powered cloud development and deployment", integrated: false, website: "#" },
  { name: "Lovable", category: "Coding", description: "Full-stack app generation from natural language", integrated: false, website: "#" },
];

export default function AIToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? aiTools : aiTools.filter((t) => t.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <Bot className="w-6 h-6 text-peach-500" /> AI Tools Marketplace
        </h1>
        <p className="text-warm-500 mt-1">Connect with market-leading AI tools for your Vibe Coding Studio</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => (
          <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? "bg-peach-100 text-peach-600 border-peach-300" : "border-warm-200 text-warm-500 hover:bg-warm-50"}>
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((tool) => (
          <Card key={tool.name} className="bg-white border-warm-200/60 hover:bg-warm-50 transition-colors shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-peach-50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-peach-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-warm-800">{tool.name}</h3>
                    <Badge variant="outline" className="border-warm-200 text-warm-500 text-[10px] mt-0.5">{tool.category}</Badge>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-warm-500 hover:text-peach-500 h-7 w-7">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-warm-500 mt-3">{tool.description}</p>
              <Button
                variant={tool.integrated ? "outline" : "default"}
                size="sm"
                className={`w-full mt-3 ${tool.integrated ? "border-emerald-500/50 text-emerald-600 hover:bg-emerald-50" : "bg-gradient-to-r from-peach-500 to-peach-400 text-white hover:from-peach-600 hover:to-peach-500"}`}
              >
                {tool.integrated ? <><Check className="w-3 h-3 mr-1" />Connected</> : <><Plug className="w-3 h-3 mr-1" />Connect</>}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
