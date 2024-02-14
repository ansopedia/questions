// choice.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IChoice extends Document {
  // Core Choice Information
  text: string;
  isCorrect: boolean;
  feedback: string[];

  // Metadata for analysis
  selectionFrequency: number;

  // Audit Trail
  createdBy: Schema.Types.ObjectId;
  updatedBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ChoiceSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    feedback: {
      type: [String],
      default: [],
    },
    selectionFrequency: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IChoice>('Choice', ChoiceSchema);
