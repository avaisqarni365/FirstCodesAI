"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Handshake,
  Building2,
  Search,
  Mail,
  Send,
  Inbox,
  MessageSquare,
  Phone,
  PhoneCall,
  Receipt,
  Wallet,
  BarChart3,
  Globe,
  UsersRound,
  Settings,
  Wrench,
  Bot,
  UserCog,
  ChevronDown,
  LogOut,
  Code2,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navigation: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "CRM",
    items: [
      { label: "Contacts", href: "/crm/contacts", icon: Users },
      { label: "Deals", href: "/crm/deals", icon: Handshake },
      { label: "Interactions", href: "/crm/interactions", icon: MessageSquare },
    ],
  },
  {
    label: "HR & Lead Gen",
    items: [
      { label: "Company Search", href: "/hr-leads/search", icon: Search },
      { label: "Companies", href: "/hr-leads/companies", icon: Building2 },
      { label: "Pipeline", href: "/hr-leads/pipeline", icon: BarChart3 },
    ],
  },
  {
    label: "Email Marketing",
    items: [
      { label: "Campaigns", href: "/email-marketing/campaigns", icon: Send },
      { label: "Compose", href: "/email-marketing/compose", icon: Mail },
      { label: "Inbox", href: "/email-marketing/inbox", icon: Inbox },
    ],
  },
  {
    label: "Communications",
    items: [
      { label: "WhatsApp", href: "/communications/whatsapp", icon: MessageSquare },
      { label: "VoIP Calls", href: "/communications/voip", icon: Phone },
      { label: "Call Logs", href: "/communications/call-logs", icon: PhoneCall },
    ],
  },
  {
    label: "Accounting",
    items: [
      { label: "Invoices", href: "/accounting/invoices", icon: Receipt },
      { label: "Expenses", href: "/accounting/expenses", icon: Wallet },
      { label: "Reports", href: "/accounting/reports", icon: BarChart3 },
    ],
  },
  {
    label: "Admin Portal",
    items: [
      { label: "Pages", href: "/admin-portal/pages", icon: Globe },
      { label: "Team", href: "/admin-portal/team", icon: UsersRound },
      { label: "Services", href: "/admin-portal/services", icon: Wrench },
      { label: "Settings", href: "/admin-portal/settings", icon: Settings },
    ],
  },
  {
    label: "Team Hub",
    items: [
      { label: "Profiles", href: "/team-hub/profiles", icon: UserCog },
      { label: "AI Tools", href: "/team-hub/ai-tools", icon: Bot },
      { label: "Collaboration", href: "/team-hub/collaboration", icon: UsersRound },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function toggleGroup(label: string) {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  return (
    <aside className="w-64 bg-white border-r border-warm-100 flex flex-col h-screen sticky top-0 shadow-sm">
      {/* Logo */}
      <div className="p-4 border-b border-warm-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-peach-500 to-peach-400 rounded-xl flex items-center justify-center shadow-md shadow-peach-200">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-warm-800 leading-tight">CODES AI</h1>
            <p className="text-[10px] text-warm-400 leading-tight">Private Limited</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
        {navigation.map((group) => (
          <div key={group.label}>
            <button
              onClick={() => toggleGroup(group.label)}
              className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-semibold text-warm-400 uppercase tracking-wider hover:text-warm-600 transition-colors"
            >
              {group.label}
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform",
                  collapsed[group.label] && "-rotate-90"
                )}
              />
            </button>
            {!collapsed[group.label] && (
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                        isActive
                          ? "bg-peach-100 text-peach-700 font-medium shadow-sm"
                          : "text-warm-500 hover:text-warm-700 hover:bg-warm-50"
                      )}
                    >
                      <item.icon className={cn("w-4 h-4 shrink-0", isActive && "text-peach-500")} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-warm-100">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-warm-400 hover:text-red-500 hover:bg-red-50 transition-all w-full"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
