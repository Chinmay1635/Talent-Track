import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  tournamentId: string;
  athleteId: string;
  contact: string;
  additionalInfo?: string;
  createdAt: Date;
}

const RegistrationSchema: Schema = new Schema({
  tournamentId: { type: String, required: true },
  athleteId: { type: String, required: true },
  contact: { type: String, required: true },
  additionalInfo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);
