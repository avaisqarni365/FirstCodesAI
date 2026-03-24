"use client";

import { useSession } from "next-auth/react";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const { data: session } = useSession();

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "CA";

  return (
    <header className="h-16 bg-white/80 backdrop-blur-sm border-b border-warm-100 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400" />
          <Input
            placeholder="Search contacts, companies, deals..."
            className="pl-10 bg-warm-50 border-warm-200 text-warm-800 placeholder:text-warm-400 w-full focus:border-peach-300 focus:ring-peach-200"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Quick Actions */}
        <Badge variant="outline" className="border-peach-300 text-peach-600 bg-peach-50 text-xs">
          +447586094540
        </Badge>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="text-warm-400 hover:text-warm-700 hover:bg-warm-50 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-peach-500 rounded-full"></span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="flex items-center gap-2 hover:bg-warm-50">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-peach-400 to-peach-500 text-white text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-warm-800">{session?.user?.name || "User"}</p>
                <p className="text-[10px] text-warm-400">{session?.user?.role || "Admin"}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border-warm-200 shadow-lg shadow-warm-100">
            <DropdownMenuLabel className="text-warm-700">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-warm-100" />
            <DropdownMenuItem className="text-warm-600 focus:bg-peach-50 focus:text-peach-700 cursor-pointer">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-warm-600 focus:bg-peach-50 focus:text-peach-700 cursor-pointer">
              Email Accounts
            </DropdownMenuItem>
            <DropdownMenuItem className="text-warm-600 focus:bg-peach-50 focus:text-peach-700 cursor-pointer">
              VoIP Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-warm-100" />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
