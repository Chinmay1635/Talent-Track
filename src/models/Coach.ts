import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoach extends Document {
  user: mongoose.Types.ObjectId;
  name?: string;
  bio?: string;
  experience?: number;
  specialization?: string;
  sport?: string;
  contactEmail?: string;
  academy?: mongoose.Types.ObjectId;
  athletes?: mongoose.Types.ObjectId[];
  trainingPlans?: mongoose.Types.ObjectId[];
  athleteProgress?: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const CoachSchema: Schema<ICoach> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  bio: { type: String },
  experience: { type: Number },
  specialization: { type: String },
  sport: { type: String },
  contactEmail: { type: String },
  academy: { type: Schema.Types.ObjectId, ref: 'Academy' },
  athletes: [{ type: Schema.Types.ObjectId, ref: 'Athlete' }],
  trainingPlans: [{ type: Schema.Types.ObjectId, ref: 'TrainingPlan' }],
  athleteProgress: [{ type: Schema.Types.ObjectId, ref: 'Progress' }],
  createdAt: { type: Date, default: Date.now },
});

const Coach: Model<ICoach> = mongoose.models.Coach || mongoose.model<ICoach>('Coach', CoachSchema);

export default Coach;
