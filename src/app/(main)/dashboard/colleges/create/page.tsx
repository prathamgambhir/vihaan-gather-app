"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Loader2, Image as ImageIcon } from "lucide-react";
import { createCollege } from "@/src/app/actions/societies";

export default function CreateCollegePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await createCollege(formData);
    
    if (result.success) {
      router.push(`/dashboard/colleges/${result.id}`);
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Register College</h1>
        <p className="text-muted-foreground mt-2">
          Add a new college or institution to the platform to start hosting societies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card border rounded-3xl p-6 md:p-8 shadow-sm">
        {error && <div className="p-4 bg-red-500/10 text-red-500 rounded-xl font-medium">{error}</div>}

        <div className="space-y-2">
           <label className="text-sm font-bold">College Name</label>
           <div className="relative">
             <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <input required name="name" type="text" placeholder="e.g. Netaji Subhas University of Technology" className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
             <label className="text-sm font-bold">Acronym</label>
             <input required name="acronym" type="text" placeholder="e.g. NSUT" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
           </div>
           <div className="space-y-2">
             <label className="text-sm font-bold">Location</label>
             <input required name="location" type="text" placeholder="e.g. New Delhi, India" defaultValue="New Delhi, India" className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
           </div>
        </div>

        <div className="space-y-2">
           <label className="text-sm font-bold">Description</label>
           <textarea required name="description" rows={4} placeholder="Describe the institution..." className="w-full px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none resize-none" />
        </div>

        <div className="space-y-2">
           <label className="text-sm font-bold">Cover Image (URL or Gradient)</label>
           <div className="relative">
             <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
             <input name="image" type="text" placeholder="linear-gradient(...) or https://..." className="w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none" />
           </div>
           <p className="text-xs text-muted-foreground">Optional. A default gradient will be provided if left blank.</p>
        </div>

        <div className="pt-4 border-t flex justify-end">
           <button type="submit" disabled={loading} className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center">
             {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
             {loading ? "Registering..." : "Register College"}
           </button>
        </div>
      </form>
    </div>
  );
}
