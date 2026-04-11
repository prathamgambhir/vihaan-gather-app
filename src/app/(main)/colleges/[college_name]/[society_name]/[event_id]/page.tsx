"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Trophy, Users, ArrowUpRight, Clock, ArrowLeft, Info, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getEventById } from "@/src/app/actions/events";
import { getSocietyById } from "@/src/app/actions/societies";

// -------------------------------------------------------------
// Original user code retained: EventCard
// -------------------------------------------------------------

interface EventCardProps {
  event: {
    id: string;
    name: string;
    description: string;
    date: bigint;
    category: string;
    mode: "online" | "offline";
    isFree: boolean;
    tags: string[];
    teamSize: bigint;
    prizePool?: bigint;
  };
  collegeName?: string;
  className?: string;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatPrize(prize: bigint): string {
  const n = Number(prize);
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

export function EventCard({ event, collegeName, className }: EventCardProps) {
  const isUpcoming = Number(event.date) > Date.now();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col h-full bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-500",
        className
      )}
    >
      <Link href={`/events/${event.id}`} className="flex flex-col h-full">
        {/* Top Section: Badges & Tags */}
        <div className="p-6 pb-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-widest rounded-full">
                {event.category}
              </span>
              <span className="px-3 py-1 border border-black/10 dark:border-white/10 text-neutral-500 dark:text-neutral-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
                {event.mode}
              </span>
            </div>
            {event.isFree && (
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Free Entry
              </span>
            )}
          </div>

          <div className="flex justify-between items-start gap-4">
            <h3 className="font-display font-bold text-2xl text-black dark:text-white leading-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
              {event.name}
            </h3>
            <div className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={16} className="text-black dark:text-white" />
            </div>
          </div>

          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {event.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 italic"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Spacer to push footer down */}
        <div className="flex-grow min-h-[20px]" />

        {/* Footer: Details & Prize */}
        <div className="p-6 pt-4 mt-4 border-t border-black/5 dark:border-white/10 bg-neutral-50/50 dark:bg-neutral-800/30">
          <div className="grid grid-cols-2 gap-y-3">
            <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-tighter">
              <Calendar size={14} strokeWidth={2.5} />
              {formatDate(event.date)}
            </div>

            <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-tighter">
              <Users size={14} strokeWidth={2.5} />
              {Number(event.teamSize) > 1 ? `Team of ${event.teamSize}` : "Solo"}
            </div>

            {collegeName && (
              <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-tighter truncate">
                <MapPin size={14} strokeWidth={2.5} />
                <span className="truncate">{collegeName}</span>
              </div>
            )}

            {event.prizePool && (
              <div className="flex items-center gap-2 text-[11px] font-black text-black dark:text-white uppercase tracking-tighter">
                <Trophy size={14} strokeWidth={2.5} className="text-neutral-400" />
                {formatPrize(event.prizePool)}
              </div>
            )}
          </div>

          {!isUpcoming && (
            <div className="mt-4 text-center">
              <span className="text-[10px] font-bold text-red-500/50 uppercase tracking-[0.2em]">
                Registration Closed
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}


// -------------------------------------------------------------
// Added EventDetailPage as default export to handle the routing
// -------------------------------------------------------------

export default function EventDetailPage() {
  const params = useParams();
  const collegeId = (params.college_name || params.collegeName) as string;
  const societyId = (params.society_name || params.societyName) as string;
  const eventId = (params.event_id || params.eventId) as string;

  const [eventData, setEventData] = useState<any>(null);
  const [societyData, setSocietyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getEventById(eventId),
      getSocietyById(societyId)
    ]).then(([event, society]) => {
      setEventData(event);
      setSocietyData(society || { name: 'Unknown Society' });
      setLoading(false);
    });
  }, [eventId, societyId]);

  if (loading) return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-black dark:text-white" /></div>;

  if (!eventData) return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center text-white font-bold text-2xl">Event not found</div>;

  const eventDetails = {
    id: eventData._id || eventData.id,
    title: eventData.title || "Event Title",
    date: eventData.startDate ? new Date(eventData.startDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : "TBA",
    time: eventData.time || "TBA",
    location: eventData.location || "TBA",
    category: eventData.category || "General",
    description: eventData.description || "No description available.",
    status: (eventData.endDate && new Date(eventData.endDate) < new Date()) ? "Completed" : "Upcoming",
    mode: eventData.isVirtual ? "Online" : "Offline",
    isFree: !eventData.price || eventData.price === 0,
    entryFee: eventData.price ? `₹${eventData.price}` : "Free",
    teamSize: "Solo/Team",
    prizePool: "TBA",
    tags: [eventData.category || "Event", "College"],
    organizer: societyData?.name || "Society",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 py-12">
        
        {/* Back Navigation */}
        <Link 
          href={`/colleges/${collegeId}/${societyId}`}
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Events</span>
        </Link>

        {/* Hero Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="mb-12"
        >
          <div className="flex gap-3 mb-6">
            <span className="px-4 py-1.5 bg-black text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-widest rounded-full">
              {eventDetails.category}
            </span>
            <span className="px-4 py-1.5 border border-black/10 dark:border-white/10 text-neutral-500 dark:text-neutral-400 text-xs font-bold uppercase tracking-widest rounded-full">
              {eventDetails.mode}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-black dark:text-white mb-6 leading-tight">
            {eventDetails.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{eventDetails.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{eventDetails.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{eventDetails.location}</span>
            </div>
          </div>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* About Event */}
            <div className="p-8 rounded-3xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/40">
              <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-4">About the Event</h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {eventDetails.description}
              </p>
            </div>

            {/* Event Tags */}
            <div className="flex flex-wrap gap-2">
              {eventDetails.tags.map(tag => (
                <span key={tag} className="px-4 py-2 rounded-xl border border-black/5 dark:border-white/10 text-sm font-medium text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/40">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Registration Card */}
            <div className="p-8 rounded-3xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/40">
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Entry</span>
                  <span className="font-bold text-black dark:text-white">{eventDetails.isFree ? "Free" : eventDetails.entryFee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Team</span>
                  <span className="font-bold text-black dark:text-white flex items-center gap-2"><Users size={16}/> {eventDetails.teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Prize Base</span>
                  <span className="font-bold text-black dark:text-white flex items-center gap-2"><Trophy size={16}/> {eventDetails.prizePool}</span>
                </div>
              </div>

              <button className="w-full py-4 bg-black text-white dark:bg-white dark:text-black rounded-full font-bold tracking-wide hover:scale-105 transition-transform shadow-xl shadow-black/10 dark:shadow-white/10">
                Register Now
              </button>
            </div>

            {/* Organizer Info */}
            <div className="p-6 rounded-3xl border border-black/5 dark:border-white/10 bg-transparent flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                <Info size={20} className="text-neutral-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-1">Organized By</p>
                <p className="font-bold text-black dark:text-white">{eventDetails.organizer}</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}