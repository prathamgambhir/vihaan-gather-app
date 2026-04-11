"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import demoImg from "@/public/deadpool-pfp.png";

// Placeholder images - replace with your actual paths in /public
// If using local imports like in your snippet, ensure they are in the 'public' folder or imported correctly
// const demoImg = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop";

const colleges = [
  { name: "DTU", slug: "dtu" },
  { name: "NSUT", slug: "nsut" },
  { name: "IIT Delhi", slug: "iit-delhi" },
  { name: "IIT Bombay", slug: "iit-bombay" },
  { name: "IIT Madras", slug: "iit-madras" },
  { name: "IIT Kanpur", slug: "iit-kanpur" },
  { name: "BITS Pilani", slug: "bits-pilani" },
  { name: "NIT Trichy", slug: "nit-trichy" },
];

const events = [
  { title: "Engifest 2026", college: "DTU", date: "Apr 18–20", img: demoImg },
  { title: "Mood Indigo", college: "IIT Bombay", date: "Apr 25–28", img: demoImg },
  { title: "Rendezvous", college: "IIT Delhi", date: "May 2–4", img: demoImg },
  { title: "Saarang", college: "IIT Madras", date: "May 10–13", img: demoImg },
  { title: "Crossroads", college: "NSUT", date: "May 16–18", img: demoImg },
  { title: "APOGEE", college: "BITS Pilani", date: "May 22–25", img: demoImg },
];

const CollegesPage = () => {
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
                    key={college.slug}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="w-fit md:w-full"
                  >
                    <Link
                      href={`/colleges/${college.slug}`}
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
              {events.map((event, i) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white dark:bg-neutral-900/50 rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                    <Image
                      src={event.img}
                      alt={event.title}
                      fill
                      className="object-cover scale transition-all duration-700 scale-105 group-hover:scale-100"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Date Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl">
                      <p className="text-xs font-bold text-black dark:text-white">{event.date}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
                      {event.college}
                    </p>
                    <h3 className="text-2xl font-display font-bold text-black dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {event.title}
                    </h3>
                    
                    <button className="mt-6 w-full py-3 border border-black dark:border-white text-black dark:text-white font-bold text-sm rounded-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                      View Event Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CollegesPage;