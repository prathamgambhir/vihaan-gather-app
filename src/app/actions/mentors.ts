"use server";

import dbConnect, { Mentor, MentorshipSession } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function isDbAvailable() {
  const conn = await dbConnect();
  return conn !== null;
}

const mockMentors = [
  {
    _id: "m1",
    name: "Dr. Arvind Sharma",
    expertise: ["AI/ML", "Career Guidance"],
    hourlyRate: 50,
    calendlyLink: "https://calendly.com/mock-arvind",
    profileImage: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    bio: "Ex-Google AI Researcher helping students crack MAANG interviews."
  },
  {
    _id: "m2",
    name: "Neha Gupta",
    expertise: ["Product Management", "Startups"],
    hourlyRate: 30,
    calendlyLink: "https://calendly.com/mock-neha",
    profileImage: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    bio: "Founder & PM. Mentoring on how to build products users love."
  }
];

export async function getMentors() {
  if (await isDbAvailable()) {
    try {
       // Since Mentor model references User to get name/bio, we'd normally populate
       const dbMentors = await Mentor.find({ isAvailable: true }).populate('userId').lean();
       if (dbMentors.length > 0) {
         // Map to match mock structure dynamically
         return dbMentors.map((m: any) => ({
           _id: m._id.toString(),
           name: m.userId?.name || "Verified Mentor",
           expertise: m.expertise,
           hourlyRate: m.hourlyRate,
           calendlyLink: m.calendlyLink,
           profileImage: m.userId?.profileImage,
           bio: m.userId?.bio || "Expert in the industry.",
         }));
       }
    } catch (e) {
       console.error("DB Error getting mentors:", e);
    }
  }
  return mockMentors;
}

export async function bookMentorSession(mentorId: string, menteeId: string) {
  if (await isDbAvailable()) {
     try {
        await MentorshipSession.create({
           mentorId,
           menteeId,
           scheduledAt: new Date(), // Mock date right now
           status: 'pending'
        });
        return { success: true };
     } catch (e) {
        console.error(e);
     }
  }
  
  return { success: true };
}
