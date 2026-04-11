"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getColleges } from "@/src/app/actions/societies";
import { getEvents } from "@/src/app/actions/events";
import { Loader2 } from "lucide-react";
import demoImg from "@/public/deadpool-pfp.png";

const CollegesPage = () => {
  const [colleges, setColleges] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getColleges(), getEvents()]).then(([cols, evts]) => {
      setColleges(cols);
      setEvents(evts);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-black dark:text-white" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Assuming Navbar is already in your layout.tsx. If not, add it here. */}
      
      <div className="max-w-[1450px] mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Sidebar - Fixed on Desktop */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full md:w-[260px] flex-shrink-0"
          >
            <div className="sticky top-28">
              <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em] mb-8">
                Explore Colleges
              </h3>
              <nav className="flex flex-wrap md:flex-col gap-2">
                {colleges.map((college, i) => (
                  <motion.div
                    key={college._id || college.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-fit md:w-full"
                  >
                    <Link
                      href={`/colleges/${college._id || college.id}`}
                      className="block px-4 py-3 rounded-lg text-lg font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all border border-transparent hover:border-black/5 dark:hover:border-white/10"
                    >
                      {college.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-black dark:text-white">
                Top Events Currently Going On
              </h1>
              <div className="h-1 w-20 bg-black dark:bg-white mt-4" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, i) => {
                const collegeName = colleges.find(c => (c._id || c.id) === event.collegeId)?.name || 'Unknown College';
                const formattedDate = event.startDate ? new Date(event.startDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' }) : 'TBA';
                
                return (
                  <motion.div
                    key={event._id || event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white dark:bg-neutral-900/50 rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                      <Image
                        src={event.image && event.image.startsWith('http') ? event.image : demoImg}
                        alt={event.title}
                        fill
                        className="object-cover scale transition-all duration-700 scale-105 group-hover:scale-100"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Date Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl">
                        <p className="text-xs font-bold text-black dark:text-white">{formattedDate}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
                        {collegeName}
                      </p>
                      <h3 className="text-2xl font-display font-bold text-black dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                        {event.title}
                      </h3>
                      
                      <Link
                        href={`/colleges/${event.collegeId}/${event.societyId}/${event._id || event.id}`}
                        className="mt-6 block text-center w-full py-3 border border-black dark:border-white text-black dark:text-white font-bold text-sm rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                      >
                        View Event Details
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CollegesPage;