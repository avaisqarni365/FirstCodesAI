"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Bot, Send, Save, Sparkles, Wand2 } from "lucide-react";

const aiTemplates: Record<string, string> = {
  introduction: `Dear [Name],

I hope this message finds you well. I'm reaching out from CODES AI Private Limited, a software engineering and AI solutions company based in London, UK.

We specialise in enterprise data platforms, AI-driven automation, and cloud solutions built on Azure, Databricks, and Microsoft Fabric. Our team has delivered transformative data solutions for organisations including Anglian Water, Carl Zeiss, and Volkswagen.

I'd love to explore how we can help [Company] leverage AI and data engineering to drive measurable business outcomes.

Would you be open to a brief 15-minute call this week?

Best regards,
Avais Ahmad Qarni
CTO & Lead Data Engineer
CODES AI Private Limited
+447586094540`,
  followup: `Hi [Name],

I wanted to follow up on my previous message about how CODES AI Private Limited could support [Company]'s data and AI initiatives.

We recently helped a similar organisation achieve:
- 40% reduction in data processing time
- 30% cost savings on cloud infrastructure
- Real-time analytics dashboards replacing weekly manual reports

I understand you're busy, so I'll keep this brief. Would a quick 10-minute call work for you this week?

Best regards,
Avais Ahmad Qarni
CODES AI Private Limited`,
  proposal: `Dear [Name],

Thank you for our recent conversation about [Company]'s requirements. Based on our discussion, I'm pleased to outline our proposed approach.

CODES AI Private Limited proposes a phased implementation:

Phase 1: Assessment & Architecture Design (2 weeks)
Phase 2: Core Platform Development (4-6 weeks)
Phase 3: Testing, Optimization & Training (2 weeks)

Our AI-first development approach means we deliver in weeks what traditional agencies take months to build, without compromising on quality or architectural integrity.

I'll prepare a detailed proposal with pricing. In the meantime, please don't hesitate to reach out with any questions.

Best regards,
Avais Ahmad Qarni
CTO & Lead Data Engineer
CODES AI Private Limited
+447586094540`,
  thankyou: `Dear [Name],

Thank you for taking the time to meet with us today. It was great to learn more about [Company]'s vision and how CODES AI Private Limited can contribute to your success.

As discussed, I'll send over the detailed proposal by [date]. Key highlights include:
- [Key point 1]
- [Key point 2]
- [Key point 3]

Looking forward to the next steps.

Warm regards,
Avais Ahmad Qarni
CODES AI Private Limited`,
};

export default function ComposePage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [template, setTemplate] = useState("");
  const [tone, setTone] = useState("professional");
  const [aiPrompt, setAiPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  function handleTemplateChange(value: string) {
    setTemplate(value);
    if (aiTemplates[value]) {
      setBody(aiTemplates[value]);
    }
  }

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      setBody(`Dear ${to || "[Name]"},

${aiPrompt || "I'd like to introduce CODES AI Private Limited and explore how we can help your organisation."}

At CODES AI Private Limited, we combine 12+ years of enterprise data engineering expertise with cutting-edge AI capabilities. Our team has delivered data platforms for FTSE 250 companies and innovative startups alike.

Our core capabilities include:
- AI-powered development and automation
- Enterprise data platforms (Azure, Databricks, Microsoft Fabric)
- Cloud migration and cost optimisation
- IoT sensor analytics and real-time dashboards

I'd welcome the opportunity to discuss how we can add value to your organisation.

Best regards,
Avais Ahmad Qarni
CTO & Lead Data Engineer
CODES AI Private Limited
+447586094540 | avaisi786@yahoo.com`);
      setGenerating(false);
    }, 1500);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <Mail className="w-6 h-6 text-peach-500" /> Compose Email
        </h1>
        <p className="text-warm-500 mt-1">Write emails with AI assistance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Email Form */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-white border-warm-200/60">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center gap-2 text-xs text-warm-500">
                <span>From:</span>
                <Badge variant="outline" className="border-peach-400/50 text-peach-600">avaisi786@yahoo.com</Badge>
              </div>
              <div>
                <Label className="text-warm-600 text-sm">To</Label>
                <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="recipient@company.com" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" />
              </div>
              <div>
                <Label className="text-warm-600 text-sm">Subject</Label>
                <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Email subject..." className="mt-1 bg-warm-50 border-warm-200 text-warm-800" />
              </div>
              <div>
                <Label className="text-warm-600 text-sm">Body</Label>
                <Textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your email or use AI to generate..." rows={16} className="mt-1 bg-warm-50 border-warm-200 text-warm-800 font-mono text-sm" />
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white"><Send className="w-4 h-4 mr-2" />Send</Button>
                <Button variant="outline" className="border-warm-200 text-warm-600 hover:bg-warm-50"><Save className="w-4 h-4 mr-2" />Save Draft</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Assistant Panel */}
        <div className="space-y-4">
          <Card className="bg-white border-warm-200/60">
            <CardHeader>
              <CardTitle className="text-warm-800 text-sm flex items-center gap-2">
                <Bot className="w-4 h-4 text-peach-500" /> AI Email Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-warm-600 text-sm">Template</Label>
                <Select value={template} onValueChange={(v) => v && handleTemplateChange(v)}>
                  <SelectTrigger className="mt-1 bg-warm-50 border-warm-200 text-warm-800"><SelectValue placeholder="Choose template..." /></SelectTrigger>
                  <SelectContent className="bg-white border-warm-200">
                    <SelectItem value="introduction">Introduction</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="thankyou">Thank You</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-warm-600 text-sm">Tone</Label>
                <Select value={tone} onValueChange={(v) => setTone(v ?? "professional")}>
                  <SelectTrigger className="mt-1 bg-warm-50 border-warm-200 text-warm-800"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-white border-warm-200">
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-warm-600 text-sm">AI Prompt</Label>
                <Textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Describe what you want the AI to write..." rows={4} className="mt-1 bg-warm-50 border-warm-200 text-warm-800 text-sm" />
              </div>
              <Button onClick={handleGenerate} disabled={generating} className="w-full bg-gradient-to-r from-peach-500 to-peach-400 text-white hover:from-peach-600 hover:to-peach-500">
                <Wand2 className="w-4 h-4 mr-2" />
                {generating ? "Generating..." : "Generate with AI"}
              </Button>
              <div className="flex items-center gap-2 text-[10px] text-warm-500">
                <Sparkles className="w-3 h-3" />
                <span>Powered by Claude AI</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
