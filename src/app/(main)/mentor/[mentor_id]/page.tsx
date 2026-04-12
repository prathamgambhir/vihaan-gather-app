"use client";

import { use, useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";
import { ArrowLeft, Loader2, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MentorBookingPage({
  params,
}: {
  params: Promise<{ mentor_id: string }>;
}) {
  const resolvedParams = use(params);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Fix: decodeURIComponent handles %20 and other URL characters
  const rawId = decodeURIComponent(resolvedParams.mentor_id);
  
  const mentorName = rawId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pt-16 pb-20">
        
        {/* Navigation */}
        <Link 
          href="/mentor" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black dark:hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Expert Network
        </Link>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-start">
          
          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-black dark:bg-white flex items-center justify-center mb-8 shadow-2xl">
              <CalendarCheck size={32} className="text-white dark:text-black" />
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tighter text-black dark:text-white leading-[0.9]">
              Book your session with <br/>
              <span className="text-neutral-500 dark:text-neutral-700">{mentorName}</span>
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-relaxed">
              Select a 1-on-1 slot for career strategy, project review, or industry insights.
            </p>
            
            <div className="pt-8 border-t border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3 text-sm font-bold text-black dark:text-white uppercase tracking-tighter">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Availability
              </div>
            </div>
          </motion.div>

          {/* Calendly Widget Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-neutral-50 dark:bg-neutral-900/50 rounded-[2.5rem] border border-black/5 dark:border-white/10 overflow-hidden min-h-[700px]"
          >
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-900 z-10">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-300 mb-4" />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Loading Calendar...
                </p>
              </div>
            )}
            
            <InlineWidget 
              url="https://calendly.com/acmesales" // Replace with actual mentor link variable
            //   onModalClose={() => console.log("Widget closed")}
              styles={{ height: "700px" }}
            //   onPageLeave={() => {}}
            //   onEventScheduled={() => console.log("Event scheduled!")}
              // This prop lets us know when the iframe is ready
              pageSettings={{
                backgroundColor: 'ffffff',
                hideEventTypeDetails: false,
                hideLandingPageDetails: false,
                primaryColor: '000000',
                textColor: '000000'
              }}
            />
            
            {/* Component to set isLoaded once rendered */}
            <WidgetLoader setReady={() => setIsLoaded(true)} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Small helper to simulate a load state for the iframe
function WidgetLoader({ setReady }: { setReady: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => setReady(), 1500);
    return () => clearTimeout(timer);
  }, [setReady]);
  return null;
}