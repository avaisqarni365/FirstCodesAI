"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Save, Globe, Phone, Mail, MapPin, Link, GitBranch } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
          <Settings className="w-6 h-6 text-warm-500" /> Site Settings
        </h1>
        <p className="text-warm-500 mt-1">Configure your website settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General */}
        <Card className="bg-white border-warm-200/60">
          <CardHeader><CardTitle className="text-warm-800 text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-peach-500" />General</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className="text-warm-600">Company Name</Label><Input defaultValue="CODES AI Private Limited" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
            <div><Label className="text-warm-600">Tagline</Label><Input defaultValue="Software Engineering, Electrical & Electronics" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
            <div><Label className="text-warm-600">Description</Label><Textarea defaultValue="CODES AI Private Limited is a UK-based software engineering, electrical and electronics company specialising in AI development, data engineering, and cloud solutions." rows={3} className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
            <div><Label className="text-warm-600">Logo URL</Label><Input placeholder="Upload or enter logo URL" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-white border-warm-200/60">
          <CardHeader><CardTitle className="text-warm-800 text-sm flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-500" />Contact Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className="text-warm-600 flex items-center gap-1"><Phone className="w-3 h-3" />Phone</Label><Input defaultValue="+447586094540" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
            <div><Label className="text-warm-600 flex items-center gap-1"><Mail className="w-3 h-3" />Email</Label><Input defaultValue="avaisi786@yahoo.com" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
            <div><Label className="text-warm-600 flex items-center gap-1"><MapPin className="w-3 h-3" />Address</Label><Input defaultValue="London, UK" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card className="bg-white border-warm-200/60">
          <CardHeader><CardTitle className="text-warm-800 text-sm flex items-center gap-2"><Link className="w-4 h-4 text-peach-500" />Social Media</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className="text-warm-600">LinkedIn</Label><Input placeholder="https://linkedin.com/company/codes-ai" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
            <div><Label className="text-warm-600">GitHub</Label><Input placeholder="https://github.com/codes-ai" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
            <div><Label className="text-warm-600">Twitter / X</Label><Input placeholder="https://x.com/codes_ai" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card className="bg-white border-warm-200/60">
          <CardHeader><CardTitle className="text-warm-800 text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-peach-500" />SEO & Analytics</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label className="text-warm-600">Default Meta Title</Label><Input defaultValue="CODES AI Private Limited | AI & Data Engineering Solutions" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
            <div><Label className="text-warm-600">Default Meta Description</Label><Textarea defaultValue="UK-based software engineering company specialising in AI development, enterprise data platforms, cloud solutions, and IoT." rows={2} className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
            <div><Label className="text-warm-600">Google Analytics ID</Label><Input placeholder="G-XXXXXXXXXX" className="mt-1 bg-warm-50 border-warm-200 text-warm-800" /></div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white"><Save className="w-4 h-4 mr-2" />Save Changes</Button>
      </div>
    </div>
  );
}
