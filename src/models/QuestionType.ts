import mongoose, { Schema, Document } from 'mongoose';

// Define a schema for question types
interface IQuestionType extends Document {
  name: string;
  description: string;

  // Audit Trail
  createdBy: Schema.Types.ObjectId;
  updatedBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  // Attachments and Additional Information
  reviewStatus: string;

  // Versioning and Data Retention
  version: number;
  isDeleted: boolean;
}

const questionTypeSchema: Schema<IQuestionType> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create a model for question types
const QuestionType = mongoose.model<IQuestionType>('QuestionType', questionTypeSchema);

export default QuestionType;
