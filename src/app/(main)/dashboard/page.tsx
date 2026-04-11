"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Building2, Calendar, Users, TrendingUp, ChevronRight, Loader2 } from "lucide-react";
import { getEvents, getRegisteredEvents } from "@/src/app/actions/events";
import { getSocieties, getColleges } from "@/src/app/actions/societies";

export default function DashboardHome() {
  const [events, setEvents] = useState<any[]>([]);
  const [societies, setSocieties] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      Promise.all([
      getEvents(),
      getSocieties(),
      getColleges(),
      getRegisteredEvents()
    ]).then(([evts, socs, cols, regs]) => {
      setEvents(evts);
      setSocieties(socs);
      setColleges(cols);
      setRegisteredEvents(regs);
      setLoading(false);
    });
  }, []);

  const upcomingEvents = events.slice(0, 3);
  const trendingColleges = colleges.filter(c => c.trending).slice(0, 4);

  const stats = [
    { label: "Total Events", value: events.length, icon: Calendar, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Societies", value: societies.length, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Colleges", value: colleges.length, icon: Building2, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Your Registrations", value: registeredEvents.length, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold tracking-tight"
          >
            Welcome back! 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-2"
          >
            Here's what is happening across Delhi colleges today.
          </motion.p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-card border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Upcoming Events</h2>
            <Link href="/dashboard/events" className="text-sm text-primary hover:underline flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => {
              const society = societies.find(s => s.id === event.societyId || s._id === event.societyId);
              return (
                <Link key={event.id || event._id} href={`/dashboard/events/${event.id || event._id}`}>
                  <div className="group rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                    <div className="h-48 w-full shrink-0" style={{ background: event.image }} />
                    <div className="p-5 flex-1 flex flex-col space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                          {event.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground">
                          {event.mode || (event.isVirtual ? 'Online' : 'Offline')}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1 flex-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 mt-auto border-t">
                        <span className="text-sm font-medium">{society?.acronym || society?.name}</span>
                        <span className="text-sm font-bold text-primary">{event.price === 0 ? "Free" : `₹${event.price}`}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Trending Colleges</h2>
            <Link href="/dashboard/colleges" className="text-sm text-primary hover:underline flex items-center">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {trendingColleges.map((college: any) => (
              <Link key={college.id || college._id} href={`/dashboard/colleges/${college.id || college._id}`}>
                <div className="p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors flex items-center gap-4 group">
                  <div className="h-12 w-12 rounded-lg shrink-0" style={{ background: college.image }} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base truncate group-hover:text-primary transition-colors">{college.name}</h4>
                    <p className="text-sm text-muted-foreground">{college.acronym}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
