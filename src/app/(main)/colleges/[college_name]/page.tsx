"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { getCollegeById, getSocieties } from "@/src/app/actions/societies";

const genres = ["All", "Technical", "Cultural", "Literary", "Music", "Dance", "Drama", "Sports"];

const CollegeDetail = () => {
  const params = useParams();
  const collegeId = (params.college_name || params.collegeName) as string;
  const [activeGenre, setActiveGenre] = useState("All");

  const [collegeDetails, setCollegeDetails] = useState<any>(null);
  const [societies, setSocieties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getCollegeById(collegeId), getSocieties()]).then(([college, allSocieties]) => {
      setCollegeDetails(college || { name: 'Unknown College', acronym: 'UNK' });
      const filteredSocs = allSocieties.filter((s: any) => s.collegeId === collegeId);
      setSocieties(filteredSocs);
      setLoading(false);
    });
  }, [collegeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-black dark:text-white" />
      </div>
    );
  }

  const displayName = collegeDetails?.name || "University Detail";
  const shortName = collegeDetails?.acronym || collegeDetails?.name?.substring(0, 3).toUpperCase() || "";

  const filtered = activeGenre === "All"
    ? societies
    : societies.filter((s) => s.category === activeGenre);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        
        {/* Back Navigation */}
        <Link 
          href="/colleges" 
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-black dark:hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-widest">Back to Colleges</span>
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-black dark:text-white mb-4">
              {displayName}
            </h1>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-xs font-bold rounded-md">
                {shortName}
              </span>
              <div className="h-[1px] flex-1 bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </motion.div>
        </header>

        {/* Filter Section */}
        <div className="flex flex-wrap gap-3 mb-12">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                activeGenre === genre
                  ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                  : "bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Societies Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((society, i) => (
              <motion.div
                key={society._id || society.id || society.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="group p-8 rounded-3xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-black hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                    {society.category || 'General'}
                  </span>
                  {society.website && (
                    <motion.a
                      whileHover={{ rotate: 45 }}
                      href={society.website || "#"}
                      target="_blank"
                      className="p-2 rounded-full bg-white dark:bg-neutral-800 text-black dark:text-white border border-black/5 dark:border-white/10"
                    >
                      <ExternalLink size={14} />
                    </motion.a>
                  )}
                </div>
                
                <h3 className="text-2xl font-display font-bold text-black dark:text-white mb-2 leading-tight">
                  {society.name}
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                  Official society of {shortName}
                </p>

                <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10">
                  <Link href={`/colleges/${collegeId}/${society._id || society.id}`} className="text-xs font-bold uppercase tracking-widest text-black dark:text-white hover:underline">
                    View Events →
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CollegeDetail;