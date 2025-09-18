import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBadge extends Document {
  name: string;
  description: string;
  icon: string;
  category: 'achievement' | 'skill' | 'participation' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const BadgeSchema: Schema<IBadge> = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  category: { type: String, enum: ['achievement', 'skill', 'participation', 'special'], required: true },
  rarity: { type: String, enum: ['common', 'rare', 'epic', 'legendary'], required: true },
});

const Badge: Model<IBadge> = mongoose.models.Badge || mongoose.model<IBadge>('Badge', BadgeSchema);

export default Badge;
