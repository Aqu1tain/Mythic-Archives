import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimony extends Document {
  creatureId: string;
  authorId: number;
  description: string;
  status: 'PENDING' | 'VALIDATED' | 'REJECTED';
  validatedBy?: number;
  validatedAt?: Date;
  createdAt: Date;
}

const testimonySchema = new Schema<ITestimony>({
  creatureId: {
    type: String,
    required: true,
  },
  authorId: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'VALIDATED', 'REJECTED'],
    default: 'PENDING',
  },
  validatedBy: {
    type: Number,
  },
  validatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ITestimony>('Testimony', testimonySchema);
