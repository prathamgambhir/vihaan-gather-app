"use client";

import { use, useState, useEffect } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Check, ExternalLink } from "lucide-react";
import { getMentors, bookMentorSession } from "@/src/app/actions/mentors";

export default function MentorDetailPage({ params }: { params: Promise<{ mentorId: string }> }) {
  const resolvedParams = use(params);
  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    getMentors().then(mentors => {
      const found = mentors.find(m => m._id === resolvedParams.mentorId);
      setMentor(found || null);
      setLoading(false);
    });
  }, [resolvedParams.mentorId]);

  if (loading) return <div className="p-20 text-center animate-pulse">Loading mentor details...</div>;
  if (!mentor) notFound();

  const handleBooking = async () => {
     // In a real app we'd pass actual mentee logged-in ID
     await bookMentorSession(mentor._id, "mock-mentee-id");
     setIsBooked(true);
  };

  return (
    <div className="pb-20 max-w-6xl mx-auto">
      <Link href="/dashboard/mentors" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Mentors
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="bg-card rounded-3xl p-8 border shadow-sm flex flex-col items-center text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-32 opacity-20" style={{ background: mentor.profileImage }} />
             <div className="h-32 w-32 rounded-full border-4 border-background shadow-xl shrink-0 z-10" style={{ background: mentor.profileImage }} />
             
             <h1 className="text-2xl font-black mt-4 z-10">{mentor.name}</h1>
             <p className="text-muted-foreground mt-1 font-medium z-10">Verified Industry Expert</p>
             
             <div className="flex flex-wrap gap-2 mt-6 justify-center z-10">
                {mentor.expertise.map((ex: string) => (
                  <span key={ex} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                     {ex}
                  </span>
                ))}
             </div>
           </div>

           <div className="bg-card rounded-3xl p-6 border shadow-sm space-y-4">
              <h3 className="font-bold text-lg border-b pb-2">Session Details</h3>
              <div className="flex items-center justify-between">
                 <span className="text-muted-foreground flex items-center gap-2"><Clock className="h-4 w-4" /> Duration</span>
                 <span className="font-medium">45 Minutes</span>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-muted-foreground flex items-center gap-2"><Calendar className="h-4 w-4" /> Availability</span>
                 <span className="font-medium text-emerald-600">Typically this week</span>
              </div>
              <div className="pt-4 border-t mt-4 flex items-center justify-between">
                 <span className="font-bold text-lg">Total Cost</span>
                 <span className="font-black text-2xl text-primary">₹{mentor.hourlyRate}</span>
              </div>
           </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="bg-card rounded-3xl p-8 border shadow-sm">
             <h2 className="text-2xl font-bold mb-4">About Me</h2>
             <p className="text-muted-foreground leading-relaxed text-lg">{mentor.bio}</p>
             
             <div className="mt-8 pt-8 border-t">
               <h3 className="text-xl font-bold mb-6 flex items-center">
                 Schedule a Session
               </h3>
               
               {!isBooked ? (
                 <div className="bg-muted rounded-2xl p-6 border border-primary/20 text-center space-y-4">
                   <p className="text-muted-foreground mb-4">You are about to book a session with {mentor.name}. This will direct you to their official Calendly portal to pick a time, while securing your spot in the Gathers system.</p>
                   <button 
                     onClick={handleBooking}
                     className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-2 w-full max-w-sm mx-auto group"
                   >
                     Pay & Book via Calendly <ExternalLink className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </button>
                 </div>
               ) : (
                 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center text-emerald-700">
                    <div className="h-16 w-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                       <Check className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Session Reserved!</h3>
                    <p className="max-w-md mx-auto">Your interest has been logged. Please complete the booking via the mentor's official <a href={mentor.calendlyLink} target="_blank" className="underline font-bold">Calendly page</a> if the popup was blocked.</p>
                 </motion.div>
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
