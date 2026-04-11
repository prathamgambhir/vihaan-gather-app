"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { getMentors } from "@/src/app/actions/mentors";
import { Search, Calendar, Star, IndianRupee } from "lucide-react";

export default function MentorsPage() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getMentors().then(setMentors);
  }, []);

  const filteredMentors = mentors.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.expertise.some((ex: string) => ex.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expert Mentorship</h1>
        <p className="text-muted-foreground mt-2">
          Connect with industry experts, get career guidance, and level up your skills via 1-on-1 sessions.
        </p>
      </div>

      <div className="bg-card border rounded-2xl p-4 shadow-sm space-y-4 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or expertise (e.g. AI, Product)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map((mentor) => (
          <motion.div key={mentor._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full">
            <Link href={`/dashboard/mentors/${mentor._id}`}>
              <div className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:border-primary/50 p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full shrink-0 shadow-sm" style={{ background: mentor.profileImage }} />
                  <div className="flex-1">
                     <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">{mentor.name}</h3>
                     <div className="flex items-center text-sm font-medium text-emerald-600 mt-1">
                       <Star className="h-4 w-4 mr-1 fill-current" /> Top Rated
                     </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mt-4 line-clamp-2">{mentor.bio}</p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {mentor.expertise.map((ex: string) => (
                    <span key={ex} className="px-2 py-1 bg-muted rounded-md text-xs font-semibold text-muted-foreground">
                       {ex}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex items-center justify-between">
                   <div className="flex items-center text-lg font-bold text-primary">
                     <IndianRupee className="h-4 w-4" /> {mentor.hourlyRate}/hr
                   </div>
                   <button className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg text-sm flex items-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                     <Calendar className="h-4 w-4 mr-2" /> Book
                   </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {filteredMentors.length === 0 && (
        <div className="text-center py-20 border border-dashed rounded-2xl bg-muted/30">
          <h3 className="text-lg font-medium">No mentors found</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your search query.</p>
        </div>
      )}
    </div>
  );
}
