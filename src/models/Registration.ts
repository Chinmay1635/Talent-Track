import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRegistration extends Document {
  tournamentId: string;
  athleteId: string;
  contact: string;
  additionalInfo?: string;
  createdAt: Date;
}

const RegistrationSchema: Schema<IRegistration> = new Schema({
  tournamentId: { type: String, required: true },
  athleteId: { type: String, required: true },
  contact: { type: String, required: true },
  additionalInfo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Registration: Model<IRegistration> = mongoose.models.Registration || mongoose.model<IRegistration>('Registration', RegistrationSchema);

export default Registration;
