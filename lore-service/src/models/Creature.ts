import mongoose, { Schema, Document } from 'mongoose';

export interface ICreature extends Document {
  name: string;
  origin: string;
  authorId: number;
  createdAt: Date;
}

const creatureSchema = new Schema<ICreature>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  origin: {
    type: String,
    required: true,
  },
  authorId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICreature>('Creature', creatureSchema);
