"use server";

import dbConnect, { User } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

async function isDbAvailable() {
  const conn = await dbConnect();
  return conn !== null;
}

// Temporary mocked user defaults for when no DB/Auth is connected
let mockCredits = 5;

async function getMongoUser() {
  const cUser = await currentUser();
  if (!cUser) return null;
  const email = cUser.emailAddresses[0]?.emailAddress?.toLowerCase();
  if (!email) return null;
  return User.findOne({ email });
}

export async function getUserCredits() {
  if (await isDbAvailable()) {
    try {
      const user = await getMongoUser();
      if (user) return user.aiCredits || 0;
    } catch (e) {
      console.error(e);
    }
  }
  return mockCredits;
}

export async function deductAICredit() {
  if (await isDbAvailable()) {
    try {
      const user = await getMongoUser();
      if (user && (user.aiCredits || 0) > 0) {
        user.aiCredits! -= 1;
        await user.save();
        revalidatePath('/dashboard/ai-assistant');
        return { success: true, remaining: user.aiCredits };
      }
      return { success: false, reason: "Insufficient credits" };
    } catch (e) {
      console.error(e);
    }
  }
  
  if (mockCredits > 0) {
     mockCredits -= 1;
     revalidatePath('/dashboard/ai-assistant');
     return { success: true, remaining: mockCredits };
  }
  return { success: false, reason: "Insufficient credits" };
}

export async function purchaseCredits(amount: number) {
  if (await isDbAvailable()) {
    try {
      const user = await getMongoUser();
      if (user) {
        user.aiCredits = (user.aiCredits || 0) + amount;
        await user.save();
        revalidatePath('/dashboard/ai-assistant');
        return { success: true, remaining: user.aiCredits };
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  mockCredits += amount;
  revalidatePath('/dashboard/ai-assistant');
  return { success: true, remaining: mockCredits };
}
