import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISponsor extends Document {
  user: mongoose.Types.ObjectId;
  name?: string;
  company?: string;
  bio?: string;
  website?: string;
  contactEmail?: string;
  tournamentWinners?: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const SponsorSchema: Schema<ISponsor> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  company: { type: String },
  bio: { type: String },
  website: { type: String },
  contactEmail: { type: String },
  tournamentWinners: [{ type: Schema.Types.ObjectId, ref: 'Athlete' }],
  createdAt: { type: Date, default: Date.now },
});

const Sponsor: Model<ISponsor> = mongoose.models.Sponsor || mongoose.model<ISponsor>('Sponsor', SponsorSchema);

export default Sponsor;
