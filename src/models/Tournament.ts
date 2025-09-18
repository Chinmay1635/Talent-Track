import mongoose, { Schema, Document } from 'mongoose';

export interface ITournament extends Document {
  name: string;
  sport: string;
  location: string;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  maxParticipants: number;
  currentParticipants: number;
  academyId: string;
  academyName: string;
  description?: string;
  eligibilityLevel: 'Beginner' | 'Intermediate' | 'Pro' | 'All';
  prizePool?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  participants?: string[];
}

const TournamentSchema: Schema = new Schema({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationDeadline: { type: Date, required: true },
  maxParticipants: { type: Number, required: true },
  currentParticipants: { type: Number, required: true },
  academyId: { type: String, required: true },
  academyName: { type: String, required: true },
  description: { type: String },
  eligibilityLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Pro', 'All'], required: true },
  prizePool: { type: String },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], required: true },
  participants: [{ type: String }],
});

const TournamentModel = (mongoose.models.Tournament || mongoose.model<ITournament>('Tournament', TournamentSchema)) as mongoose.Model<ITournament>;
export default TournamentModel;
