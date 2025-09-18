import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrainingPlan extends Document {
  athlete: mongoose.Types.ObjectId;
  coach: mongoose.Types.ObjectId;
  exercises?: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const TrainingPlanSchema: Schema<ITrainingPlan> = new Schema({
  athlete: { type: Schema.Types.ObjectId, ref: 'Athlete', required: true },
  coach: { type: Schema.Types.ObjectId, ref: 'Coach', required: true },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  createdAt: { type: Date, default: Date.now },
});

const TrainingPlan: Model<ITrainingPlan> = mongoose.models.TrainingPlan || mongoose.model<ITrainingPlan>('TrainingPlan', TrainingPlanSchema);

export default TrainingPlan;
