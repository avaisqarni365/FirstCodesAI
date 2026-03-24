"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const mockPages = [
  { id: "1", title: "Home", slug: "/", isPublished: true, updatedAt: "2026-03-24" },
  { id: "2", title: "About Us", slug: "/about", isPublished: true, updatedAt: "2026-03-20" },
  { id: "3", title: "Services", slug: "/services", isPublished: true, updatedAt: "2026-03-22" },
  { id: "4", title: "Contact", slug: "/contact", isPublished: true, updatedAt: "2026-03-18" },
  { id: "5", title: "Blog", slug: "/blog", isPublished: true, updatedAt: "2026-03-15" },
  { id: "6", title: "Careers", slug: "/careers", isPublished: false, updatedAt: "2026-03-10" },
  { id: "7", title: "Case Studies", slug: "/case-studies", isPublished: false, updatedAt: "2026-03-05" },
];

export default function PagesManagementPage() {
  const [pages, setPages] = useState(mockPages);

  function togglePublish(id: string) {
    setPages((prev) => prev.map((p) => p.id === id ? { ...p, isPublished: !p.isPublished } : p));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-warm-800 flex items-center gap-2">
            <Globe className="w-6 h-6 text-peach-500" /> Website Pages
          </h1>
          <p className="text-warm-500 mt-1">Manage your website content</p>
        </div>
        <Button className="bg-gradient-to-r from-peach-500 to-peach-400 text-white"><Plus className="w-4 h-4 mr-2" />Add Page</Button>
      </div>

      <Card className="bg-white border-warm-200/60">
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b border-warm-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Title</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Slug</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Published</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Updated</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-warm-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-warm-200/60 hover:bg-peach-50/50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-warm-800">{page.title}</td>
                  <td className="py-3 px-4 text-sm font-mono text-peach-600">{page.slug}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className={page.isPublished ? "border-emerald-500/50 text-emerald-600" : "border-warm-300/50 text-warm-500"}>
                      {page.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4"><Switch checked={page.isPublished} onCheckedChange={() => togglePublish(page.id)} /></td>
                  <td className="py-3 px-4 text-sm text-warm-500">{page.updatedAt}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-warm-500 hover:text-peach-500"><Eye className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-warm-500 hover:text-warm-800"><Pencil className="w-3 h-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-warm-500 hover:text-red-500"><Trash2 className="w-3 h-3" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
