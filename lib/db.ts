import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  var mongooseDb: { conn: typeof mongoose | null, promise: Promise<typeof mongoose> | null } | undefined;
}

let cached = (global as any).mongooseDb;

if (!cached) {
  cached = (global as any).mongooseDb = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI environment variable is missing. Database operations will return mock data or fail gracefully.');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export interface IUser {
  email: string;
  name: string;
  role?: 'user' | 'admin' | 'mentor';
  profileImage?: string;
  bio?: string;
  aiCredits?: number;
  followedSocieties?: mongoose.Types.ObjectId[];
}

export interface ISociety {
  name: string;
  description?: string;
  logo?: string;
  banner?: string;
  acronym?: string;
  category?: string;
  collegeId?: mongoose.Types.Mixed; // Storing as Mixed
  ownerId?: mongoose.Types.ObjectId;
  isVerified?: boolean;
}

export interface ISocietyMember {
  societyId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  role?: string;
  joinedAt?: Date;
}

export interface IEvent {
  societyId: mongoose.Types.ObjectId | string; // Optional ref to live DB or mock string ID
  collegeId: mongoose.Types.Mixed;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  mode?: 'Online' | 'Offline';
  price?: number;
  calendlyEventId?: string;
  startDate: Date;
  endDate: Date;
  time?: string;
  location?: string;
  isVirtual?: boolean;
}

export interface IEventRegistration {
  eventId: mongoose.Types.ObjectId | string;
  userId: mongoose.Types.ObjectId | string;
  registeredAt?: Date;
  status?: 'confirmed' | 'waitlisted' | 'cancelled';
}

export interface IMentor {
  userId: mongoose.Types.ObjectId;
  expertise: string[];
  calendlyLink?: string;
  hourlyRate?: number;
  isAvailable?: boolean;
}

export interface IMentorshipSession {
  mentorId: mongoose.Types.ObjectId;
  menteeId: mongoose.Types.ObjectId;
  scheduledAt: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  platformFee?: number;
}

export interface ISponsorship {
  societyId: mongoose.Types.ObjectId;
  sponsorName: string;
  amount: number;
  startDate?: Date;
  endDate?: Date;
}

export interface ITransaction {
  userId: mongoose.Types.ObjectId;
  type: string;
  amount: number;
  description?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'mentor'], default: 'user' },
  profileImage: { type: String },
  bio: { type: String },
  aiCredits: { type: Number, default: 0 },
  followedSocieties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Society' }],
}, { timestamps: true });

const SocietySchema = new mongoose.Schema<ISociety>({
  name: { type: String, required: true },
  acronym: { type: String },
  category: { type: String },
  collegeId: { type: mongoose.Schema.Types.Mixed },
  description: { type: String },
  logo: { type: String },
  banner: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const SocietyMemberSchema = new mongoose.Schema<ISocietyMember>({
  societyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, default: 'member' },
  joinedAt: { type: Date, default: Date.now },
});

const EventSchema = new mongoose.Schema<IEvent>({
  societyId: { type: mongoose.Schema.Types.Mixed, required: true }, // Mixed to support mock string IDs or ObjectIds
  collegeId: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
  mode: { type: String },
  price: { type: Number, default: 0 },
  time: { type: String },
  location: { type: String },
  calendlyEventId: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isVirtual: { type: Boolean, default: false },
}, { timestamps: true });

const EventRegistrationSchema = new mongoose.Schema<IEventRegistration>({
  eventId: { type: mongoose.Schema.Types.Mixed, required: true },
  userId: { type: mongoose.Schema.Types.Mixed, required: true },
  registeredAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['confirmed', 'waitlisted', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });

const MentorSchema = new mongoose.Schema<IMentor>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  expertise: { type: [String], required: true },
  calendlyLink: { type: String },
  hourlyRate: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

const MentorshipSessionSchema = new mongoose.Schema<IMentorshipSession>({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledAt: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  platformFee: { type: Number, default: 0 },
}, { timestamps: true });

const SponsorshipSchema = new mongoose.Schema<ISponsorship>({
  societyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
  sponsorName: { type: String, required: true },
  amount: { type: Number, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
}, { timestamps: true });

const TransactionSchema = new mongoose.Schema<ITransaction>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
}, { timestamps: true });

export interface ICollege {
  name: string;
  acronym?: string;
  description?: string;
  image?: string;
  location?: string;
  trending?: boolean;
}

const CollegeSchema = new mongoose.Schema<ICollege>({
  name: { type: String, required: true },
  acronym: { type: String },
  description: { type: String },
  image: { type: String },
  location: { type: String, default: "New Delhi, India" },
  trending: { type: Boolean, default: false },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const College = mongoose.models.College || mongoose.model<ICollege>('College', CollegeSchema);
export const Society = mongoose.models.Society || mongoose.model<ISociety>('Society', SocietySchema);
export const SocietyMember = mongoose.models.SocietyMember || mongoose.model<ISocietyMember>('SocietyMember', SocietyMemberSchema);
export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
export const EventRegistration = mongoose.models.EventRegistration || mongoose.model<IEventRegistration>('EventRegistration', EventRegistrationSchema);
export const Mentor = mongoose.models.Mentor || mongoose.model<IMentor>('Mentor', MentorSchema);
export const MentorshipSession = mongoose.models.MentorshipSession || mongoose.model<IMentorshipSession>('MentorshipSession', MentorshipSessionSchema);
export const Sponsorship = mongoose.models.Sponsorship || mongoose.model<ISponsorship>('Sponsorship', SponsorshipSchema);
export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default dbConnect;
