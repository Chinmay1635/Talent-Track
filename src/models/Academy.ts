
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAcademy extends Document {
  name: string;
  userId: string;
  location?: string;
  sports: string[];
  description?: string;
  website?: string;
  establishedYear?: number;
  contactEmail?: string;
  createdAt: Date;
}

const AcademySchema: Schema<IAcademy> = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  location: { type: String },
  sports: { type: [String], default: [] },
  description: { type: String },
  website: { type: String },
  establishedYear: { type: Number },
  contactEmail: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Academy: Model<IAcademy> = mongoose.models.Academy || mongoose.model<IAcademy>('Academy', AcademySchema);

export default Academy;
