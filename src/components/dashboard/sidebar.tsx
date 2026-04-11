"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Users, 
  CalendarDays, 
  Ticket, 
  Bot, 
  LayoutDashboard,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Colleges", href: "/dashboard/colleges", icon: Building2 },
  { name: "Societies", href: "/dashboard/societies", icon: Users },
  { name: "Events", href: "/dashboard/events", icon: CalendarDays },
  { name: "My Registrations", href: "/dashboard/my-registrations", icon: Ticket },
  { name: "Mentors", href: "/dashboard/mentors", icon: Users },
  { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: Bot },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <div className="space-y-2 mt-8">
      {navItems.map((item) => {
        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard");

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClick}
            className={cn(
              "flex items-center px-4 py-3 rounded-xl transition-all duration-300 group",
              isActive 
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <item.icon className={cn(
              "mr-3 h-5 w-5 transition-transform duration-300 group-hover:scale-110",
              isActive ? "text-primary-foreground" : ""
            )} />
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-background border rounded-md shadow-sm"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-card border-r z-50 p-6 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                    Gathers
                  </span>
                </Link>
                <button onClick={() => setIsMobileOpen(false)} className="p-2 hover:bg-muted rounded-full">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto w-full">
                <NavLinks onClick={() => setIsMobileOpen(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 border-r bg-card/50 backdrop-blur-xl p-6">
        <Link href="/" className="flex items-center gap-2 px-2 transition-transform hover:scale-105 duration-300">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Gathers
          </span>
        </Link>

        <div className="flex-1 overflow-y-auto mt-8 w-full hide-scrollbar">
          <NavLinks />
        </div>

        <div className="mt-auto pt-6 border-t">
          <div className="flex items-center gap-3 px-2">
             <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center border border-border">
                <span className="text-sm font-medium">U</span>
             </div>
             <div className="flex flex-col">
                <span className="text-sm font-medium">Demo User</span>
                <span className="text-xs text-muted-foreground">demo@gathers.com</span>
             </div>
          </div>
        </div>
      </aside>
    </>
  );
}
