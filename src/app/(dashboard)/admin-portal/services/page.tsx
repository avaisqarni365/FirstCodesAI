"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Wrench, Plus, Bot, Database, Cloud, Cpu, Phone, Globe, GripVertical } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { bot: Bot, database: Database, cloud: Cloud, cpu: Cpu, phone: Phone, globe: Globe };

const initialServices = [
  { id: "0", title: "AI Development & Automation", icon: "bot", description: "Custom AI solutions using Claude, GPT, and local LLMs", features: ["AI-Assisted Development", "Custom LLM Integration", "Process Automation", "Intelligent Chatbots"], active: true },
  { id: "1", title: "Data Engineering", icon: "database", description: "Enterprise-grade data platforms on Azure, Databricks, and Fabric", features: ["Azure Synapse", "Databricks Delta Lake", "ETL/ELT Pipelines", "Power BI Dashboards"], active: true },
  { id: "2", title: "Cloud Solutions", icon: "cloud", description: "Azure cloud architecture, migration, and optimization", features: ["Azure Migration", "Cost Optimization", "CI/CD Pipelines", "Infrastructure as Code"], active: true },
  { id: "3", title: "IoT & Electronics", icon: "cpu", description: "IoT sensor platforms and real-time streaming", features: ["Sensor Data Processing", "Real-time Analytics", "Azure IoT Hub", "Hardware Integration"], active: true },
  { id: "4", title: "VoIP & Communications", icon: "phone", description: "Business communication solutions with UK VoIP numbers", features: ["UK VoIP Numbers", "Call Analytics", "WhatsApp Integration", "Unified Communications"], active: true },
  { id: "5", title: "Web & App Development", icon: "globe", description: "Full-stack web and mobile applications", features: ["Next.js / React", "Mobile Apps", "Vibe Coding Studio", "Rapid Prototyping"], active: true },
];

export default function ServicesPage() {
  const [services, setServices] = useState(initialServices);

  function toggleActive(id: string) {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, active: !s.active } : s));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Wrench className="w-6 h-6 text-peach-500" /> Services
          </h1>
          <p className="text-warm-500 mt-1">Manage services displayed on your website</p>
        </div>
        <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white"><Plus className="w-4 h-4 mr-2" />Add Service</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Globe;
          return (
            <Card key={service.id} className={`border-warm-200/60 transition-colors ${service.active ? "bg-white" : "bg-warm-50 opacity-60"}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <GripVertical className="w-4 h-4 text-warm-300 mt-1 cursor-grab" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-peach-500 to-peach-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-warm-800">{service.title}</h3>
                      <Switch checked={service.active} onCheckedChange={() => toggleActive(service.id)} />
                    </div>
                    <p className="text-xs text-warm-500 mt-1">{service.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {service.features.map((f) => (
                        <Badge key={f} variant="outline" className="border-warm-200 text-warm-600 text-[10px]">{f}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <p className="text-xs text-warm-500 text-center">Drag to reorder services on your website</p>
    </div>
  );
}
