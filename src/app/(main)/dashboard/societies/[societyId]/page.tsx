"use client";

import { use, useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Users2, Building2, Calendar, Check, Loader2 } from "lucide-react";
import { getSocietyById, getCollegeById, toggleFollowSociety } from "@/src/app/actions/societies";
import { getEvents } from "@/src/app/actions/events";

export default function SocietyDetailPage({ params }: { params: Promise<{ societyId: string }> }) {
  const resolvedParams = use(params);
  
  const [society, setSociety] = useState<any>(null);
  const [college, setCollege] = useState<any>(null);
  const [societyEvents, setSocietyEvents] = useState<any[]>([]);
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const dbSoc = await getSocietyById(resolvedParams.societyId);
      if (!dbSoc) {
        setLoading(false);
        return;
      }
      setSociety(dbSoc);
      setFollowerCount(dbSoc.followerCount || 0);

      if (dbSoc.collegeId) {
        setCollege(await getCollegeById(dbSoc.collegeId));
      }

      const allEvts = await getEvents();
      setSocietyEvents(allEvts.filter((e: any) => (e.societyId === dbSoc.id || e.societyId === dbSoc._id)));

      // Mock user is following state normally fetched from user object
      setLoading(false);
    }
    loadData();
  }, [resolvedParams.societyId]);

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!society) notFound();

  const toggleFollow = async () => {
    // Optimistic update
    if (isFollowing) {
      setFollowerCount(prev => prev - 1);
    } else {
      setFollowerCount(prev => prev + 1);
    }
    setIsFollowing(!isFollowing);

    await toggleFollowSociety(resolvedParams.societyId);
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <Link href="/dashboard/societies" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Societies
        </Link>
        <div className="rounded-3xl overflow-hidden shadow-sm relative">
          <div className="h-48 md:h-64 lg:h-72 w-full" style={{ background: society.banner }} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
             <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  <div className="h-24 w-24 md:h-32 md:w-32 rounded-2xl border-4 border-background shadow-xl shrink-0 flex items-center justify-center" style={{ background: society.logo }} />
                  <div className="pb-2">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-medium text-xs">
                         {society.category}
                       </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{society.name}</h1>
                    <div className="flex flex-wrap items-center mt-3 gap-4 text-sm font-medium text-muted-foreground">
                        {college ? (
                          <Link href={`/dashboard/colleges/${college.id || (college as any)._id}`} className="hover:text-primary transition-colors flex items-center">
                            <Building2 className="h-4 w-4 mr-1" /> {college.name}
                          </Link>
                        ) : null}
                    </div>
                  </div>
                </div>
                
                <div className="pb-2 flex items-center gap-4">
                   <div className="text-center sm:text-right">
                     <p className="text-2xl font-bold">{followerCount.toLocaleString()}</p>
                     <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Followers</p>
                   </div>
                   <button 
                     onClick={toggleFollow}
                     className={`px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm flex items-center gap-2 ${
                       isFollowing 
                         ? "bg-secondary text-secondary-foreground border" 
                         : "bg-primary text-primary-foreground hover:bg-primary/90"
                     }`}
                   >
                     {isFollowing ? (
                       <>
                         <Check className="h-4 w-4" /> Following
                       </>
                     ) : (
                       "Follow"
                     )}
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="pt-4 max-w-4xl">
        <h2 className="text-xl font-bold mb-3">About</h2>
        <p className="text-muted-foreground leading-relaxed">{society.description}</p>
      </div>

      <div className="pt-6">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-bold flex items-center">
             <Calendar className="h-6 w-6 mr-2 text-primary" />
             Events Organization
           </h2>
           <span className="bg-muted px-3 py-1 rounded-full text-sm font-medium">
             {societyEvents.length} Events
           </span>
        </div>

        {societyEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {societyEvents.map((event, i) => (
              <motion.div 
                key={event.id || event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Link href={`/dashboard/events/${event.id || event._id}`}>
                  <div className="group rounded-2xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:border-primary/50">
                    <div className="h-40 w-full" style={{ background: event.image }} />
                    <div className="p-5 flex-1 flex flex-col space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                          {event.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-secondary text-secondary-foreground">
                          {event.mode || (event.isVirtual ? 'Online' : 'Offline')}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors flex-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm font-medium text-muted-foreground">{new Date(event.date || event.startDate).toLocaleDateString()}</span>
                        <span className="text-sm font-bold text-primary">{event.price === 0 ? "Free" : `₹${event.price}`}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border border-dashed rounded-2xl bg-muted/50">
             <h3 className="text-lg font-medium text-muted-foreground">No upcoming events right now.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
