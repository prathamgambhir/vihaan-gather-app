"use client";

import { motion } from "framer-motion";
import { Calendar, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import demoImg from "@/public/mentor1.jpeg"

// Replace these with actual paths or public URLs
// const demoImg = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop";

const mentors = [
  { name: "Priya Sharma", role: "Product Manager at Google", expertise: "Career Strategy", rating: 4.9, sessions: 120, img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
  { name: "Arjun Mehta", role: "SDE-III at Microsoft", expertise: "DSA & System Design", rating: 4.8, sessions: 95, img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop" },
  { name: "Sneha Gupta", role: "Design Lead at Figma", expertise: "UI/UX Design", rating: 4.9, sessions: 80, img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=600&auto=format&fit=crop" },
  { name: "Rohan Verma", role: "Founder, TechStartup", expertise: "Entrepreneurship", rating: 4.7, sessions: 65, img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop" },
  { name: "Ananya Patel", role: "ML Engineer at Meta", expertise: "AI & Machine Learning", rating: 4.8, sessions: 110, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop" },
  { name: "Vikram Singh", role: "VP Engineering, Razorpay", expertise: "Engineering Leadership", rating: 4.9, sessions: 150, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
];

const MentorPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 pb-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-[1px] bg-black dark:bg-white" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
              Expert Network
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-black dark:text-white leading-[0.95] mb-8"
          >
            Learn from the best <br />
            <span className="text-neutral-300 dark:text-neutral-700 italic">mentors</span> in tech.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed"
          >
            Book 1-on-1 sessions with industry leaders. Get personalized guidance on 
            career strategy, system design, and scaling startups.
          </motion.p>
        </div>

        {/* Mentor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((mentor, i) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-neutral-50 dark:bg-neutral-900/40 rounded-[2.5rem] border border-black/5 dark:border-white/10 overflow-hidden hover:bg-white dark:hover:bg-black transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
            >
              {/* Image Section */}
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={mentor.img}
                  alt={mentor.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-6 right-6">
                   <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md p-2 rounded-full shadow-xl">
                      <CheckCircle2 size={18} className="text-black dark:text-white" />
                   </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-black dark:text-white mb-1">
                      {mentor.name}
                    </h3>
                    <p className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                      {mentor.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.03] px-2 py-1 rounded-md">
                    <Star size={12} className="fill-black dark:fill-white text-black dark:text-white" />
                    <span className="text-xs font-bold text-black dark:text-white">{mentor.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="px-3 py-1 border border-black/10 dark:border-white/10 rounded-full text-[10px] font-black uppercase tracking-tighter text-neutral-500 dark:text-neutral-400">
                    {mentor.expertise}
                  </span>
                  <span className="px-3 py-1 bg-neutral-200 dark:bg-neutral-800 rounded-full text-[10px] font-black uppercase tracking-tighter text-neutral-600 dark:text-neutral-400">
                    {mentor.sessions} sessions
                  </span>
                </div>

                <button className="w-full group/btn flex items-center justify-center gap-2 py-4 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98]">
                  <Calendar size={16} />
                  Book 1-on-1 Session
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorPage;