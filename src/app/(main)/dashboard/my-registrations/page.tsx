"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { getRegisteredEvents } from "@/src/app/actions/events";
import { getSocieties } from "@/src/app/actions/societies";
import { Ticket, Calendar, Clock, MapPin, ChevronRight, Loader2 } from "lucide-react";

export default function MyRegistrationsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [registeredEvents, setRegisteredEvents] = useState<any[]>([]);
  const [societies, setSocieties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getRegisteredEvents(),
      getSocieties()
    ]).then(([events, socs]) => {
      setRegisteredEvents(events);
      setSocieties(socs);
      setLoading(false);
    });
  }, []);

  const upcomingEvents = registeredEvents.filter(e => new Date(e.date || e.startDate) >= new Date('2026-01-01'));
  const pastEvents = registeredEvents.filter(e => new Date(e.date || e.startDate) < new Date('2026-01-01'));

  const currentEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Registrations</h1>
        <p className="text-muted-foreground mt-2">
          Keep track of your upcoming events and past participations.
        </p>
      </div>

      <div className="flex bg-muted/50 p-1.5 rounded-2xl w-full max-w-sm">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "upcoming" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Upcoming ({upcomingEvents.length})
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "past" 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Past ({pastEvents.length})
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           variants={container}
           initial="hidden"
           animate="show"
           exit={{ opacity: 0, y: -10 }}
           className="space-y-4"
        >
          {currentEvents.length > 0 ? (
            currentEvents.map((event) => {
              const society = societies.find(s => s.id === event.societyId || s._id === event.societyId);
              return (
                <motion.div key={event.id || event._id} variants={item}>
                  <Link href={`/dashboard/events/${event.id || event._id}`}>
                    <div className="group bg-card border rounded-3xl p-4 sm:p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center">
                       <div className="h-40 sm:h-32 w-full sm:w-48 rounded-2xl shrink-0 relative overflow-hidden" style={{ background: event.image }}>
                          <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-md px-2 py-1 rounded-lg border shadow-sm flex flex-col items-center justify-center">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase leading-none">{new Date(event.date || event.startDate).toLocaleString('default', { month: 'short' })}</span>
                            <span className="text-lg font-black leading-tight text-foreground">{new Date(event.date || event.startDate).getDate()}</span>
                          </div>
                       </div>
                       
                       <div className="flex-1 w-full space-y-3">
                          <div className="flex items-center gap-2">
                             <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                               {event.category}
                             </span>
                             <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground">
                               {event.mode || (event.isVirtual ? 'Online' : 'Offline')}
                             </span>
                          </div>
                          
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{event.title}</h3>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground">
                             <span className="flex items-center"><Calendar className="h-4 w-4 mr-1.5" /> {new Date(event.date || event.startDate).getFullYear()}</span>
                             <span className="flex items-center"><Clock className="h-4 w-4 mr-1.5" /> {event.time || "10:00 AM"}</span>
                             <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5" /> <span className="truncate max-w-[150px]">{event.location || "Online"}</span></span>
                          </div>
                       </div>

                       <div className="shrink-0 w-full sm:w-auto mt-4 sm:mt-0 flex justify-end">
                          <div className="h-12 w-12 rounded-full border bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                            <ChevronRight className="h-6 w-6" />
                          </div>
                       </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20 border border-dashed rounded-3xl bg-muted/30">
               <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
               <h3 className="text-xl font-bold">No {activeTab} registrations</h3>
               <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                 You haven't registered for any events yet. Head over to the events page and discover what's happening.
               </p>
               <Link href="/dashboard/events">
                 <button className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                   Discover Events
                 </button>
               </Link>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
