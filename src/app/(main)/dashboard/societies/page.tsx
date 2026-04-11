"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { getSocieties, getColleges } from "@/src/app/actions/societies";
import { Search, Users2, Loader2 } from "lucide-react";

export default function SocietiesPage() {
  const [societies, setSocieties] = useState<any[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    Promise.all([getSocieties(), getColleges()]).then(([socs, cols]) => {
      setSocieties(socs);
      setColleges(cols);
      setLoading(false);
    });
  }, []);

  const categories = ["All", ...Array.from(new Set(societies.map(s => s.category)))];

  const filteredSocieties = societies.filter(society => {
    const matchesSearch = society.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (society.acronym || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || society.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Societies</h1>
          <p className="text-muted-foreground mt-2">
            Find your tribe. Join clubs that match your passions.
          </p>
        </div>
        <Link href="/dashboard/societies/create">
           <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-md hover:bg-primary/90 transition-all">
              + New Society
           </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search societies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={String(category)}
              onClick={() => setSelectedCategory(String(category))}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-card border hover:bg-muted"
              }`}
            >
              {String(category)}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredSocieties.map((society) => {
          const college = colleges.find(c => c.id === society.collegeId || c._id === society.collegeId);
          return (
            <motion.div key={society.id || society._id} variants={item} className="h-full">
              <Link href={`/dashboard/societies/${society.id || society._id}`}>
                <div className="group rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col hover:border-primary/50">
                   <div className="h-24 w-full" style={{ background: society.banner }} />
                   <div className="px-5 pt-0 pb-5 flex-1 flex flex-col">
                      <div className="flex justify-between items-end">
                        <div className="h-16 w-16 rounded-xl border-4 border-card -mt-8 shadow-sm flex items-center justify-center bg-background" style={{ background: society.logo }} />
                        <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {society.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mt-3 group-hover:text-primary transition-colors line-clamp-1">{society.name}</h3>
                      <p className="text-sm font-medium text-muted-foreground mb-3">{college?.acronym || college?.name}</p>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{society.description}</p>
                      
                      <div className="mt-4 pt-4 border-t flex items-center text-sm font-medium text-primary">
                         <Users2 className="h-4 w-4 mr-1.5" />
                         {(society.followerCount || 0).toLocaleString()} followers
                      </div>
                   </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
      
      {filteredSocieties.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No societies found.</p>
        </div>
      )}
    </div>
  );
}
