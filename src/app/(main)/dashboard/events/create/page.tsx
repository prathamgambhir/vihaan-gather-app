"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Calendar, MapPin, IndianRupee, Image as ImageIcon } from "lucide-react";
import { createEvent } from "@/src/app/actions/events";
import { getSocieties } from "@/src/app/actions/societies";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [societies, setSocieties] = useState<any[]>([]);

  useEffect(() => {
    getSocieties().then(setSocieties);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // We handle finding the appropriate college off the selected society.
    const formData = new FormData(e.currentTarget);
    const selectedSoc = societies.find(s => (s.id || s._id) === formData.get("societyId"));
    if (selectedSoc) {
       formData.append("collegeId", selectedSoc.collegeId);
    }
    
    const result = await createEvent(formData);
    
    if (result.success) {
      router.push(`/dashboard/events/${result.id}`);
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Host an Event</h1>
        <p className="text-muted-foreground mt-2">
          Create a hackathon, workshop, or seminar to engage your community.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card border rounded-3xl p-6 md:p-8 shadow-sm">
        {error && <div className="p-4 bg-red-500/10 text-red-500 rounded-xl font-medium">{error}</div>}

        <div className="space-y-2">
           <label className="text-sm font-bold">Event Title</label>
           <input required name="title" type="text" placeholder="e.g. Hackverse 3.0" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-bold">Hosting Society</label>
             <select required name="societyId" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none">
               <option value="">Select your society...</option>
               {societies.map(s => (
                 <option key={s.id || s._id} value={s.id || s._id}>{s.name}</option>
               ))}
             </select>
           </div>
           <div className="space-y-2">
             <label className="text-sm font-bold">Category</label>
             <select required name="category" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none">
               <option value="Hackathon">Hackathon</option>
               <option value="Workshop">Workshop</option>
               <option value="Cultural">Cultural</option>
               <option value="Sports">Sports</option>
               <option value="Seminar">Seminar</option>
               <option value="Other">Other</option>
             </select>
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-bold">Event Description</label>
           <textarea required name="description" rows={5} placeholder="What is this event about?" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-bold">Date</label>
             <div className="relative">
               <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <input required name="date" type="date" className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
             </div>
           </div>
           <div className="space-y-2">
             <label className="text-sm font-bold">Time</label>
             <input required name="time" type="time" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-bold">Price (₹)</label>
             <div className="relative">
               <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <input required name="price" type="number" min="0" placeholder="0 for Free" className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
             </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-bold">Mode</label>
             <select required name="mode" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none">
               <option value="Offline">Offline</option>
               <option value="Online">Online</option>
             </select>
           </div>
           <div className="space-y-2">
             <label className="text-sm font-bold">Location / Link</label>
             <div className="relative">
               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
               <input required name="location" type="text" placeholder="e.g. Main Auditorium" className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
             </div>
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-bold">Event Image (URL or Gradient)</label>
           <div className="relative">
             <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <input name="image" type="text" placeholder="Optional URL" className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
           </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
           <button type="submit" disabled={loading} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center">
             {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
             {loading ? "Publishing..." : "Publish Event"}
           </button>
        </div>
      </form>
    </div>
  );
}
