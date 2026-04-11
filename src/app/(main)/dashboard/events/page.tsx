"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { getEvents } from "@/src/app/actions/events";
import { getSocieties } from "@/src/app/actions/societies";
import { Search, MapPin, Calendar, Clock, IndianRupee, Loader2 } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [societies, setSocieties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [selectedPrice, setSelectedPrice] = useState<string>("All");

  useEffect(() => {
    Promise.all([getEvents(), getSocieties()]).then(([evts, socs]) => {
      setEvents(evts);
      setSocieties(socs);
      setLoading(false);
    });
  }, []);

  const categories = ["All", ...Array.from(new Set(events.map(e => e.category)))];
  const modes = ["All", "Online", "Offline"];
  const prices = ["All", "Free", "Paid"];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesMode = selectedMode === "All" || event.mode === selectedMode;
    
    let matchesPrice = true;
    if (selectedPrice === "Free") matchesPrice = event.price === 0;
    if (selectedPrice === "Paid") matchesPrice = event.price > 0;

    return matchesSearch && matchesCategory && matchesMode && matchesPrice;
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
     return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discover Events</h1>
          <p className="text-muted-foreground mt-2">
            Find hackathons, fests, debates, and workshops happening around you.
          </p>
        </div>
        <Link href="/dashboard/events/create">
           <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-md hover:bg-primary/90 transition-all">
              + Host Event
           </button>
        </Link>
      </div>

      <div className="bg-card border rounded-2xl p-4 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
             <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Category</label>
             <select 
               value={selectedCategory} 
               onChange={(e) => setSelectedCategory(e.target.value)}
               className="w-full bg-background border px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
             >
               {categories.map(c => <option key={String(c)} value={String(c)}>{String(c)}</option>)}
             </select>
           </div>
           <div>
             <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Mode</label>
             <select 
               value={selectedMode} 
               onChange={(e) => setSelectedMode(e.target.value)}
               className="w-full bg-background border px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
             >
               {modes.map(m => <option key={m} value={m}>{m}</option>)}
             </select>
           </div>
           <div>
             <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Price</label>
             <select 
               value={selectedPrice} 
               onChange={(e) => setSelectedPrice(e.target.value)}
               className="w-full bg-background border px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
             >
               {prices.map(p => <option key={p} value={p}>{p}</option>)}
             </select>
           </div>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredEvents.map((event) => {
          const society = societies.find(s => s.id === event.societyId || s._id === event.societyId);
          return (
            <motion.div key={event.id || event._id} variants={item} className="h-full">
              <Link href={`/dashboard/events/${event.id || event._id}`}>
                <div className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:border-primary/50">
                  <div className="h-48 w-full relative" style={{ background: event.image }}>
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border shadow-sm flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-muted-foreground uppercase leading-none">{new Date(event.date || event.startDate).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-xl font-black leading-tight text-foreground">{new Date(event.date || event.startDate).getDate()}</span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary">
                          {event.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary text-secondary-foreground">
                          {event.mode || (event.isVirtual ? 'Online' : 'Offline')}
                        </span>
                        {event.price === 0 && (
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600">
                            Free
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">by {society?.name || "Verified Society"}</p>
                    </div>
                    
                    <div className="space-y-2 mt-auto pt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time || "10:00 AM"}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="truncate">{event.location || "Online"}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t flex items-center justify-between mt-auto">
                      <span className="font-bold text-lg text-primary flex items-center">
                        {event.price > 0 ? `₹${event.price}` : 'Free'}
                      </span>
                      <span className="text-sm font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                         View Details
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-20 border border-dashed rounded-2xl bg-muted/30">
          <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
          <h3 className="text-lg font-medium">No events found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your filters or search query.</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSelectedMode("All");
              setSelectedPrice("All");
            }}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90"
          >
             Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
