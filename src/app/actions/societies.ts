"use server";

import dbConnect, { Society, User, College } from "@/lib/db";
import { societies as mockSocieties, colleges } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";

async function isDbAvailable() {
  const conn = await dbConnect();
  return conn !== null;
}

export async function getSocieties() {
  if (await isDbAvailable()) {
    try {
      const dbSocieties = await Society.find({}).lean();
      return dbSocieties.length > 0 ? JSON.parse(JSON.stringify(dbSocieties)) : mockSocieties;
    } catch {
      return mockSocieties;
    }
  }
  return mockSocieties;
}

export async function getSocietyById(id: string) {
  if (await isDbAvailable()) {
    try {
      const dbSoc = await Society.findById(id).lean() || await Society.findOne({_id: id}).lean();
      if (dbSoc) return JSON.parse(JSON.stringify(dbSoc));
    } catch {
      // fallback
    }
  }
  return mockSocieties.find(s => s.id === id);
}

export async function getColleges() {
  if (await isDbAvailable()) {
    try {
      const dbColleges = await College.find({}).lean();
      return dbColleges.length > 0 ? JSON.parse(JSON.stringify(dbColleges)) : colleges;
    } catch {
      return colleges;
    }
  }
  return colleges;
}

export async function getCollegeById(id: string) {
  if (await isDbAvailable()) {
    try {
      const dbCol = await College.findById(id).lean() || await College.findOne({_id: id}).lean();
      if (dbCol) return JSON.parse(JSON.stringify(dbCol));
    } catch {
      // fallback
    }
  }
  return colleges.find(c => c.id === id);
}

export async function createCollege(formData: FormData) {
  if (await isDbAvailable()) {
    try {
      const newCollege = await College.create({
        name: formData.get("name"),
        acronym: formData.get("acronym"),
        description: formData.get("description"),
        image: formData.get("image") || "linear-gradient(135deg, #1e3a8a, #3b82f6)",
        location: formData.get("location") || "New Delhi, India",
        trending: true
      });
      revalidatePath('/dashboard/colleges');
      return { success: true, id: newCollege._id.toString() };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
  return { success: false, error: "Database not connected" };
}

export async function createSociety(formData: FormData) {
  if (await isDbAvailable()) {
    try {
      const cUser = await currentUser();
      if (!cUser) return { success: false, error: "Unauthorized" };
      const email = cUser.emailAddresses[0]?.emailAddress?.toLowerCase();
      const user = await User.findOne({ email });

      const newSoc = await Society.create({
        name: formData.get("name"),
        acronym: formData.get("acronym"),
        category: formData.get("category"),
        collegeId: formData.get("collegeId"),
        description: formData.get("description"),
        logo: formData.get("logo") || "linear-gradient(135deg, #f59e0b, #ef4444)",
        banner: formData.get("banner") || "linear-gradient(135deg, #374151, #111827)",
        ownerId: user?._id,
        isVerified: true
      });
      revalidatePath('/dashboard/societies');
      return { success: true, id: newSoc._id.toString() };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
  return { success: false, error: "Database not connected" };
}

import { currentUser } from "@clerk/nextjs/server";

export async function toggleFollowSociety(societyId: string) {
  if (await isDbAvailable()) {
    try {
      const cUser = await currentUser();
      if (!cUser) return { success: false, reason: "Unauthorized" };
      
      const email = cUser.emailAddresses[0]?.emailAddress?.toLowerCase();
      const user = await User.findOne({ email });
      if (user) {
         const index = user.followedSocieties.indexOf(societyId as any);
         if (index > -1) {
            user.followedSocieties.splice(index, 1);
         } else {
            user.followedSocieties.push(societyId as any);
         }
         await user.save();
         revalidatePath(`/dashboard/societies/${societyId}`);
         return { success: true, isFollowing: index === -1 };
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  // Mock logic: simply revalidate
  revalidatePath(`/dashboard/societies/${societyId}`);
  return { success: true };
}
