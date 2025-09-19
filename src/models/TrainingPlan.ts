import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrainingPlan extends Document {
  athlete?: mongoose.Types.ObjectId; // Make optional
  coach: string;
  title: string;
  description?: string;
  sport: string;
  level: 'beginner' | 'intermediate' | 'pro';
  exercises: Array<{
    id: string;
    name: string;
    description: string;
    sets: number;
    reps: number;
    duration: number;
    restTime: number;
    completed: boolean;
  }>;
  duration?: number;
  createdAt: Date;
  status?: string;
}

const ExerciseSchema = new Schema({
  id: String,
  name: String,
  description: String,
  sets: Number,
  reps: Number,
  duration: Number,
  restTime: Number,
  completed: Boolean
});

const TrainingPlanSchema: Schema<ITrainingPlan> = new Schema({
  athlete: { type: Schema.Types.ObjectId, ref: 'Athlete', required: false }, // Make optional
  coach: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  sport: { type: String, required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'pro'], required: true },
  exercises: [ExerciseSchema],
  duration: { type: Number },
  createdAt: { type: Date, default: Date.now },
  status: { type: String }
});

const TrainingPlan: Model<ITrainingPlan> = mongoose.models.TrainingPlan || mongoose.model<ITrainingPlan>('TrainingPlan', TrainingPlanSchema);

export default TrainingPlan;
