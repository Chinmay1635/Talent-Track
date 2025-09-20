import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAthlete extends Document {
  user: mongoose.Types.ObjectId;
  name?: string;
  age?: number;
  sport?: string;
  region?: string;
  level?: string;
  bio?: string;
  badges?: mongoose.Types.ObjectId[];
  contactEmail?: string;
  academy?: mongoose.Types.ObjectId;
  coach?: mongoose.Types.ObjectId;
  trainingPlans?: mongoose.Types.ObjectId[];
  registrations?: mongoose.Types.ObjectId[];
  // Disability Information
  isDisabled?: boolean;
  disabilityType?: string;
  disabilityDescription?: string;
  accommodationsNeeded?: string[];
  medicalCertification?: string;
  createdAt: Date;
}

const AthleteSchema: Schema<IAthlete> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  age: { type: Number },
  sport: { type: String },
  region: { type: String },
  level: { type: String },
  bio: { type: String },
  badges: { type: [{ type: Schema.Types.ObjectId, ref: 'Badge' }], default: [] },
  contactEmail: { type: String },
  academy: { type: Schema.Types.ObjectId, ref: 'Academy' },
  coach: { type: Schema.Types.ObjectId, ref: 'Coach' },
  trainingPlans: [{ type: Schema.Types.ObjectId, ref: 'TrainingPlan' }],
  registrations: [{ type: Schema.Types.ObjectId, ref: 'Registration' }],
  // Disability Information
  isDisabled: { type: Boolean, default: false },
  disabilityType: { 
    type: String, 
    enum: [
      'Physical Disability',
      'Visual Impairment', 
      'Hearing Impairment',
      'Intellectual Disability',
      'Mental Health Condition',
      'Neurological Condition',
      'Chronic Illness',
      'Multiple Disabilities',
      'Other'
    ]
  },
  disabilityDescription: { type: String },
  accommodationsNeeded: [{ type: String }],
  medicalCertification: { type: String }, // File path or certification number
  createdAt: { type: Date, default: Date.now },
});

const Athlete: Model<IAthlete> = mongoose.models.Athlete || mongoose.model<IAthlete>('Athlete', AthleteSchema);

export default Athlete;
