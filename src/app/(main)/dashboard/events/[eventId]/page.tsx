"use client";

import { use, useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin, Ticket, Building2, Share2, Heart, Users2, Loader2 } from "lucide-react";
import { getEventById, toggleRegistration, getRegisteredEvents } from "@/src/app/actions/events";
import { getSocietyById, getCollegeById } from "@/src/app/actions/societies";

export default function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
  const resolvedParams = use(params);
  
  const [event, setEvent] = useState<any>(null);
  const [society, setSociety] = useState<any>(null);
  const [college, setCollege] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    async function loadData() {
      const dbEvent = await getEventById(resolvedParams.eventId);
      if (!dbEvent) {
        setLoading(false);
        return;
      }
      setEvent(dbEvent);

      if (dbEvent.societyId) {
        const dbSoc = await getSocietyById(dbEvent.societyId);
        setSociety(dbSoc);
      }
      if (dbEvent.collegeId) {
        const dbCol = await getCollegeById(dbEvent.collegeId);
        setCollege(dbCol);
      }

      const regs = await getRegisteredEvents();
      setIsRegistered(regs.some((r: any) => (r.id || r._id) === resolvedParams.eventId));

      setLoading(false);
    }
    loadData();
  }, [resolvedParams.eventId]);

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!event) notFound();

  const handleRegister = async () => {
    setIsProcessing(true);
    await toggleRegistration(resolvedParams.eventId);
    setIsRegistered(!isRegistered);
    setIsProcessing(false);
  };

  return (
    <div className="pb-20">
      <Link href="/dashboard/events" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-3xl overflow-hidden shadow-md relative group">
            <div className="h-64 md:h-96 w-full transition-transform duration-700 group-hover:scale-105" style={{ background: event.image }} />
            <div className="absolute top-4 right-4 flex gap-3">
               <button 
                 onClick={() => setIsLiked(!isLiked)} 
                 className={`p-3 rounded-full backdrop-blur-md border shadow-sm transition-all ${isLiked ? 'bg-red-500/20 text-red-500 border-red-500/30' : 'bg-background/80 text-foreground hover:bg-background'}`}
               >
                 <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
               </button>
               <button className="p-3 bg-background/80 backdrop-blur-md text-foreground rounded-full border shadow-sm hover:bg-background transition-all">
                 <Share2 className="h-5 w-5" />
               </button>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
               <span className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground shadow-lg">
                 {event.category}
               </span>
               <span className="px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-background/90 text-foreground shadow-lg backdrop-blur-md">
                 {event.mode || (event.isVirtual ? 'Online' : 'Offline')}
               </span>
            </div>
          </div>

          <div>
             <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-4">{event.title}</h1>
             <p className="text-lg text-muted-foreground mt-4 leading-relaxed whitespace-pre-line">{event.description}</p>
          </div>
          
          <div className="pt-6 border-t">
            <h3 className="text-xl font-bold mb-6">Event Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="flex bg-card border rounded-2xl p-4 gap-4 items-start shadow-sm hover:shadow-md transition-all">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary"><Calendar className="h-6 w-6" /></div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Date</h4>
                    <p className="font-medium mt-1">{new Date(event.date || event.startDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                  </div>
               </div>
               <div className="flex bg-card border rounded-2xl p-4 gap-4 items-start shadow-sm hover:shadow-md transition-all">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600"><Clock className="h-6 w-6" /></div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Time</h4>
                    <p className="font-medium mt-1">{event.time || "10:00 AM"}</p>
                  </div>
               </div>
               <div className="flex bg-card border rounded-2xl p-4 gap-4 items-start shadow-sm hover:shadow-md transition-all">
                  <div className="p-3 rounded-xl bg-orange-500/10 text-orange-600"><MapPin className="h-6 w-6" /></div>
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Location</h4>
                    <p className="font-medium mt-1">{event.location || "Online"}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-3xl p-6 shadow-xl shadow-primary/5 sticky top-24">
             <div className="text-center pb-6 border-b">
               <p className="text-muted-foreground font-medium uppercase tracking-widest text-sm mb-2">Registration</p>
               <h2 className="text-4xl font-black">{event.price === 0 ? "Free" : `₹${event.price}`}</h2>
             </div>
             
             <div className="py-6 space-y-4">
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center"><Ticket className="h-4 w-4 mr-2" /> Spots left</span>
                    <span className="font-bold text-emerald-600">Filling Fast</span>
                 </div>
                 <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center"><Users2 className="h-4 w-4 mr-2" /> Registered</span>
                    <span className="font-bold">142+</span>
                 </div>
             </div>

             <button 
               onClick={handleRegister}
               disabled={isProcessing}
               className={`w-full py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                 isRegistered 
                 ? "bg-secondary text-secondary-foreground border hover:bg-secondary/80" 
                 : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/30"
               }`}
             >
               {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : isRegistered ? "Unregister" : "Register Now"}
             </button>
             <p className="text-xs text-center text-muted-foreground mt-4">
               {isRegistered ? "You're confirmed for this event!" : "Secure your spot before it's too late!"}
             </p>
          </div>

          {society && (
            <div className="bg-card border rounded-3xl p-6 shadow-sm">
               <h3 className="font-semibold uppercase tracking-wider text-sm text-muted-foreground mb-4">Organized By</h3>
               <Link href={`/dashboard/societies/${society.id || society._id}`}>
                 <div className="flex items-center gap-4 group hover:bg-muted p-2 -m-2 rounded-xl transition-colors">
                    <div className="h-16 w-16 rounded-xl shrink-0 border" style={{ background: society.logo }} />
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{society.name}</h4>
                       <p className="text-sm font-medium text-muted-foreground flex items-center mt-1">
                         <Building2 className="h-3 w-3 mr-1" /> {college?.acronym || college?.name}
                       </p>
                    </div>
                 </div>
               </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
