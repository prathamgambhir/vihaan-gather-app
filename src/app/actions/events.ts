"use server";

import dbConnect, { Event, EventRegistration, User } from "@/lib/db";
import { events as mockEvents, myRegistrations as mockRegs } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

// Temporary fallback logic for missing env variables
async function isDbAvailable() {
  const conn = await dbConnect();
  return conn !== null;
}

async function getMongoUser() {
  const cUser = await currentUser();
  if (!cUser) return null;
  const email = cUser.emailAddresses[0]?.emailAddress?.toLowerCase();
  if (!email) return null;
  return User.findOne({ email }).lean();
}

export async function getEvents() {
  if (await isDbAvailable()) {
    try {
      const dbEvents = await Event.find({}).lean();
      return dbEvents.length > 0 ? JSON.parse(JSON.stringify(dbEvents)) : mockEvents;
    } catch {
      return mockEvents;
    }
  }
  return mockEvents;
}

export async function getEventById(id: string) {
  if (await isDbAvailable()) {
    try {
      const dbEvent = await Event.findById(id).lean() || await Event.findOne({_id: id}).lean();
      if (dbEvent) return JSON.parse(JSON.stringify(dbEvent));
    } catch {
      // fallback
    }
  }
  return mockEvents.find(e => e.id === id);
}

export async function getRegisteredEvents() {
  if (await isDbAvailable()) {
    try {
      const user = await getMongoUser();
      if (!user) return [];
      const regs = await EventRegistration.find({ userId: user._id, status: 'confirmed' }).lean();
      const eventIds = regs.map(r => r.eventId);
      const registeredEvents = await Event.find({ _id: { $in: eventIds } }).lean();
      return JSON.parse(JSON.stringify(registeredEvents));
    } catch {
      return mockEvents.filter(e => mockRegs.includes(e.id));
    }
  }
  return mockEvents.filter(e => mockRegs.includes(e.id));
}

export async function toggleRegistration(eventId: string) {
  if (await isDbAvailable()) {
    try {
      const user = await getMongoUser();
      if (!user) return { success: false, reason: "Unauthorized" };
      
      const existing = await EventRegistration.findOne({ eventId, userId: user._id });
      if (existing) {
        if (existing.status === 'cancelled') {
           existing.status = 'confirmed';
           await existing.save();
        } else {
           existing.status = 'cancelled';
           await existing.save();
        }
      } else {
        await EventRegistration.create({ eventId, userId: user._id, status: 'confirmed' });
      }
      revalidatePath(`/dashboard/events/${eventId}`);
      revalidatePath(`/dashboard/my-registrations`);
      return { success: true };
    } catch (e) {
      console.error("DB Error in toggleRegistration", e);
    }
  }
  
  // Mock fallback logic
  const idx = mockRegs.indexOf(eventId);
  if (idx > -1) mockRegs.splice(idx, 1);
  else mockRegs.push(eventId);
  
  revalidatePath(`/dashboard/events/${eventId}`);
  revalidatePath(`/dashboard/my-registrations`);
  return { success: true };
}

export async function createEvent(formData: FormData) {
  if (await isDbAvailable()) {
    try {
      const user = await getMongoUser();
      if (!user) return { success: false, error: "Unauthorized" };

      const isVirtual = formData.get("mode") === "Online";

      const newEvent = await Event.create({
        societyId: formData.get("societyId"),
        collegeId: formData.get("collegeId"),
        title: formData.get("title"),
        description: formData.get("description"),
        image: formData.get("image") || "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
        category: formData.get("category"),
        mode: formData.get("mode"),
        price: Number(formData.get("price")) || 0,
        startDate: new Date(formData.get("date") as string),
        endDate: new Date(formData.get("date") as string), // simple mock for now
        time: formData.get("time"),
        location: formData.get("location"),
        isVirtual,
      });

      revalidatePath('/dashboard/events');
      return { success: true, id: newEvent._id.toString() };
    } catch (e: any) {
      return { success: false, error: e.message };
    }
  }
  return { success: false, error: "Database not connected" };
}
