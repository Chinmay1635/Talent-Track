import mongoose, { Schema, Document, Types, Model } from 'mongoose';

export interface IApplication extends Document {
  coachId: Types.ObjectId;
  academyId: Types.ObjectId;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  coachId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  academyId: { type: Schema.Types.ObjectId, ref: 'Academy', required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Application: Model<IApplication> = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
