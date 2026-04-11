"use client";

import { use, useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Users2, MapPin, Loader2 } from "lucide-react";
import { getCollegeById, getSocieties } from "@/src/app/actions/societies";

export default function CollegeDetailPage({ params }: { params: Promise<{ collegeId: string }> }) {
  const resolvedParams = use(params);
  const [college, setCollege] = useState<any>(null);
  const [collegeSocieties, setCollegeSocieties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      const dbCol = await getCollegeById(resolvedParams.collegeId);
      if (!dbCol) {
        setLoading(false);
        return;
      }
      setCollege(dbCol);

      const socs = await getSocieties();
      setCollegeSocieties(socs.filter((s: any) => s.collegeId === dbCol.id || s.collegeId === (dbCol as any)._id));
      setLoading(false);
    }
    loadData();
  }, [resolvedParams.collegeId]);

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!college) notFound();

  return (
    <div className="space-y-8 pb-10">
      <div>
        <Link href="/dashboard/colleges" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Colleges
        </Link>
        <div className="rounded-3xl overflow-hidden shadow-sm relative">
          <div className="h-48 md:h-64 lg:h-80 w-full" style={{ background: college.image }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
             <div className="flex flex-col md:flex-row md:items-end gap-6">
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl border-4 border-background shadow-xl shrink-0" style={{ background: college.image }} />
                <div className="flex-1 pb-2">
                   <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{college.name}</h1>
                   <div className="flex flex-wrap items-center mt-3 gap-4">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-medium text-sm">
                         {college.acronym}
                      </span>
                      <span className="flex items-center text-sm font-medium text-muted-foreground">
                         <MapPin className="h-4 w-4 mr-1" /> New Delhi, India
                      </span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="pt-4 max-w-4xl">
        <h2 className="text-xl font-bold mb-3">About</h2>
        <p className="text-muted-foreground leading-relaxed">{college.description}</p>
      </div>

      <div className="pt-6">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold flex items-center">
             <Users2 className="h-6 w-6 mr-2 text-primary" />
             Societies
           </h2>
           <span className="bg-muted px-3 py-1 rounded-full text-sm font-medium">
             {collegeSocieties.length} Total
           </span>
        </div>

        {collegeSocieties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegeSocieties.map((society, i) => (
              <motion.div 
                key={society.id || society._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Link href={`/dashboard/societies/${society.id || society._id}`}>
                  <div className="group rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col hover:border-primary/50">
                     <div className="h-24 w-full" style={{ background: society.banner }} />
                     <div className="px-5 pt-0 pb-5 flex-1 flex flex-col">
                        <div className="h-16 w-16 rounded-xl border-4 border-card -mt-8 shadow-sm flex items-center justify-center bg-background" style={{ background: society.logo }} />
                        <h3 className="font-bold text-lg mt-3 group-hover:text-primary transition-colors">{society.name}</h3>
                        <p className="text-sm font-medium text-primary mb-2">{society.category}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{society.description}</p>
                        <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm">
                           <span className="font-medium">{(society.followerCount || 0).toLocaleString()} followers</span>
                        </div>
                     </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-dashed rounded-2xl bg-muted/50">
             <h3 className="text-lg font-medium text-muted-foreground">No societies listed for this college yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
