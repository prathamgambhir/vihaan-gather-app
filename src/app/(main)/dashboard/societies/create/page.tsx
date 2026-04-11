"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Users2, Image as ImageIcon } from "lucide-react";
import { createSociety, getColleges } from "@/src/app/actions/societies";

export default function CreateSocietyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [colleges, setColleges] = useState<any[]>([]);

  useEffect(() => {
    getColleges().then(setColleges);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await createSociety(formData);
    
    if (result.success) {
      router.push(`/dashboard/societies/${result.id}`);
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create a Society</h1>
        <p className="text-muted-foreground mt-2">
          Start a new club and build your community on campus.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card border rounded-3xl p-6 md:p-8 shadow-sm">
        {error && <div className="p-4 bg-red-500/10 text-red-500 rounded-xl font-medium">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-bold">Society Name</label>
             <div className="relative">
               <Users2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
               <input required name="name" type="text" placeholder="e.g. The Coding Club" className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
             </div>
           </div>
           <div className="space-y-2">
             <label className="text-sm font-bold">Acronym</label>
             <input required name="acronym" type="text" placeholder="e.g. TCC" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-bold">Category</label>
             <select required name="category" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none">
               <option value="Technical">Technical</option>
               <option value="Cultural">Cultural</option>
               <option value="Sports">Sports</option>
               <option value="Literary">Literary</option>
               <option value="Arts">Arts</option>
               <option value="Other">Other</option>
             </select>
           </div>
           <div className="space-y-2">
             <label className="text-sm font-bold">Parent College</label>
             <select required name="collegeId" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none">
               <option value="">Select a college...</option>
               {colleges.map(c => (
                 <option key={c.id || c._id} value={c.id || c._id}>{c.name}</option>
               ))}
             </select>
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-bold">About the Society</label>
           <textarea required name="description" rows={4} placeholder="What is the mission of your society?" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-bold">Logo (URL or Gradient)</label>
             <div className="relative">
               <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
               <input name="logo" type="text" placeholder="Optional URL" className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
             </div>
           </div>
           <div className="space-y-2">
             <label className="text-sm font-bold">Banner (URL or Gradient)</label>
             <div className="relative">
               <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
               <input name="banner" type="text" placeholder="Optional URL" className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
             </div>
           </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
           <button type="submit" disabled={loading} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center">
             {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
             {loading ? "Creating..." : "Create Society"}
           </button>
        </div>
      </form>
    </div>
  );
}
