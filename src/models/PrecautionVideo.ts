import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPrecautionVideo extends Document {
  coach: mongoose.Types.ObjectId;
  title: string;
  videoId: string;
  videoUrl: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PrecautionVideoSchema: Schema<IPrecautionVideo> = new Schema({
  coach: { type: Schema.Types.ObjectId, ref: 'Coach', required: true },
  title: { type: String, required: true, trim: true },
  videoId: { type: String, required: true, trim: true },
  videoUrl: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add index for faster queries
PrecautionVideoSchema.index({ coach: 1 });
PrecautionVideoSchema.index({ videoId: 1, coach: 1 }, { unique: true });

// Update the updatedAt field before saving
PrecautionVideoSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const PrecautionVideo: Model<IPrecautionVideo> = mongoose.models.PrecautionVideo || mongoose.model<IPrecautionVideo>('PrecautionVideo', PrecautionVideoSchema);

export default PrecautionVideo;