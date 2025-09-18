import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  role: 'athlete' | 'coach' | 'academy' | 'sponsor';
  bio?: string;
  age?: number;
  sport?: string;
  region?: string;
  experience?: number;
  specialization?: string;
  company?: string;
  website?: string;
  description?: string;
  level?: string;
  badges?: string[];
  contactEmail?: string;
  establishedYear?: number;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['athlete', 'coach', 'academy', 'sponsor'], required: true },
  bio: { type: String },
  age: { type: Number },
  sport: { type: String },
  region: { type: String },
  experience: { type: Number },
  specialization: { type: String },
  company: { type: String },
  website: { type: String },
  description: { type: String },
  level: { type: String },
  badges: { type: [String], default: [] },
  contactEmail: { type: String },
  establishedYear: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
