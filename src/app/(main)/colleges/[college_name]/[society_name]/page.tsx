"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { getCollegeById, getSocietyById } from "@/src/app/actions/societies";
import { getEvents } from "@/src/app/actions/events";

const categories = ["All", "Competition", "Workshop", "Networking", "Seminar"];

const SocietyDetail = () => {
  const params = useParams();
  const collegeId = (params.college_name || params.collegeName) as string;
  const societyId = (params.society_name || params.societyName) as string;
  
  const [activeCategory, setActiveCategory] = useState("All");

  const [collegeData, setCollegeData] = useState<any>(null);
  const [societyData, setSocietyData] = useState<any>(null);
  const [eventsData, setEventsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getCollegeById(collegeId),
      getSocietyById(societyId),
      getEvents()
    ]).then(([college, society, allEvents]) => {
      setCollegeData(college || { name: 'Unknown College' });
      setSocietyData(society || { name: 'Unknown Society' });
      
      const filteredEvents = allEvents.filter((e: any) => e.societyId === societyId);
      setEventsData(filteredEvents);
      setLoading(false);
    });
  }, [collegeId, societyId]);

  if (loading) return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-black dark:text-white" /></div>;

  const formattedSocietyName = societyData?.name || "Society Detail";
  const shortCollegeName = collegeData?.acronym || collegeData?.name?.substring(0, 3).toUpperCase() || "";

  const filteredEvents = activeCategory === "All" 
    ? eventsData 
    : eventsData.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        
        {/* Back Navigation */}
        <Link 
          href={`/colleges/${collegeId}`}
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Societies</span>
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-black dark:text-white mb-4">
              {formattedSocietyName}
            </h1>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-xs font-bold rounded-md">
                {shortCollegeName}
              </span>
              <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </motion.div>
        </header>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                activeCategory === category
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                  : "bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events List */}
        <motion.div layout className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={event._id || event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group flex flex-col md:flex-row gap-6 p-8 rounded-3xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-black hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-500"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                      {event.category || 'General'}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-1 rounded-sm ${
                      (event.endDate && new Date(event.endDate) < new Date()) ? 'bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {(event.endDate && new Date(event.endDate) < new Date()) ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-black dark:text-white mb-2 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium mb-6 max-w-2xl">
                    {event.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      <span className="font-medium">{event.startDate ? new Date(event.startDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock size={16} />
                      <span className="font-medium">{event.time || 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      <span className="font-medium">{event.location || 'TBA'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center md:border-l border-black/5 dark:border-white/10 md:pl-8 mt-4 md:mt-0">
                  {(event.endDate && new Date(event.endDate) < new Date()) ? (
                    <button className="w-full md:w-auto px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold tracking-wide hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100" disabled>
                      Closed
                    </button>
                  ) : (
                    <Link href={`/colleges/${collegeId}/${societyId}/${event._id || event.id}`} className="w-full md:w-auto px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold tracking-wide hover:scale-105 transition-transform text-center inline-block">
                      View Details
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
      </div>
    </div>
  );
};

export default SocietyDetail;
