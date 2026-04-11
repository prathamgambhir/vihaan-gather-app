"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { getColleges, getSocieties } from "@/src/app/actions/societies";
import { Building2, Search, Loader2 } from "lucide-react";

export default function CollegesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState<any[]>([]);
  const [societies, setSocieties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getColleges(), getSocieties()]).then(([cols, socs]) => {
      setColleges(cols);
      setSocieties(socs);
      setLoading(false);
    });
  }, []);

  const filteredColleges = colleges.filter(college => 
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (college.acronym || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Colleges</h1>
          <p className="text-muted-foreground mt-2">
            Discover societies and events across premium institutions.
          </p>
        </div>
        <Link href="/dashboard/colleges/create">
           <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-md hover:bg-primary/90 transition-all">
              + New College
           </button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search colleges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredColleges.map((college: any) => {
          const societyCount = societies.filter(s => s.collegeId === college.id || s.collegeId === college._id).length;
          
          return (
            <motion.div key={college.id || college._id} variants={item} className="h-full">
              <Link href={`/dashboard/colleges/${college.id || college._id}`}>
                <div className="group h-full flex flex-col rounded-2xl border bg-card overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
                  <div className="h-32 w-full relative" style={{ background: college.image }}>
                    <div className="absolute -bottom-6 left-6 h-12 w-12 rounded-xl bg-background border shadow-sm flex items-center justify-center p-1">
                      <div className="h-full w-full rounded-lg" style={{ background: college.image }} />
                    </div>
                  </div>
                  <div className="flex-1 p-6 pt-10 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
                        {college.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">{college.acronym}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {college.description}
                    </p>
                    
                    <div className="pt-4 mt-auto border-t flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Building2 className="h-4 w-4 mr-1.5" />
                        <span>{societyCount} Societies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      
      {filteredColleges.length === 0 && (
        <div className="text-center py-20 border border-dashed rounded-2xl bg-muted/30">
          <p className="text-muted-foreground">No colleges found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
}
