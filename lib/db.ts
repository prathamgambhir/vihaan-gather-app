import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

declare global {
  var mongoose: { conn: typeof mongoose | null, promise: Promise<typeof mongoose> | null } | undefined;
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
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
}

export interface ISociety {
  name: string;
  description?: string;
  logo?: string;
  ownerId: string;
  isVerified?: boolean;
}

export interface ISocietyMember {
  societyId: string;
  userId: string;
  role?: string;
  joinedAt?: Date;
}

export interface IEvent {
  societyId: string;
  title: string;
  description?: string;
  calendlyEventId?: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  isVirtual?: boolean;
}

export interface IMentor {
  userId: string;
  expertise: string[];
  calendlyLink?: string;
  hourlyRate?: number;
  isAvailable?: boolean;
}

export interface IMentorshipSession {
  mentorId: string;
  menteeId: string;
  scheduledAt: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  platformFee?: number;
}

export interface ISponsorship {
  societyId: string;
  sponsorName: string;
  amount: number;
  startDate?: Date;
  endDate?: Date;
}

export interface ITransaction {
  userId: string;
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
}, { timestamps: true });

const SocietySchema = new mongoose.Schema<ISociety>({
  name: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

const SocietyMemberSchema = new mongoose.Schema<ISocietyMember>({
  societyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, default: 'member' },
  joinedAt: { type: Date, default: Date.now },
});

const EventSchema = new mongoose.Schema<IEvent>({
  societyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Society', required: true },
  title: { type: String, required: true },
  description: { type: String },
  calendlyEventId: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String },
  isVirtual: { type: Boolean, default: false },
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

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Society = mongoose.models.Society || mongoose.model<ISociety>('Society', SocietySchema);
export const SocietyMember = mongoose.models.SocietyMember || mongoose.model<ISocietyMember>('SocietyMember', SocietyMemberSchema);
export const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
export const Mentor = mongoose.models.Mentor || mongoose.model<IMentor>('Mentor', MentorSchema);
export const MentorshipSession = mongoose.models.MentorshipSession || mongoose.model<IMentorshipSession>('MentorshipSession', MentorshipSessionSchema);
export const Sponsorship = mongoose.models.Sponsorship || mongoose.model<ISponsorship>('Sponsorship', SponsorshipSchema);
export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default dbConnect;
