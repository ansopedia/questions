// question.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IChoice } from './choice';

export interface IQuestion extends Document {
  // Core Question Information
  text: string;
  choices: IChoice[];
  correctAnswer: string;
  difficultyLevel: string;
  category: string;
  points: number;
  timeLimit: number;

  // Author and User Interaction
  feedback: string;
  tags: string[];
  isActive: boolean;
  viewCount: number;

  // Meta Fields for Organization and Search
  keywords: string[];
  relatedQuestions: Schema.Types.ObjectId[];

  // Analytics and Insights
  averageTimeTaken: number;
  correctAnswerPercentage: number;
  commonIncorrectAnswers: string[];

  // Versioning and Data Retention
  version: number;
  isDeleted: boolean;

  // Audit Trail
  createdBy: Schema.Types.ObjectId;
  updatedBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  // Attachments and Additional Information
  attachments: string[]; // File references
  questionType: string;
  customFields: Record<string, unknown>;
  questionPools: Schema.Types.ObjectId[];
  reviewStatus: string;
}

const QuestionSchema: Schema<IQuestion> = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    choices: [{ type: Schema.Types.ObjectId, ref: 'Choice' }],
    correctAnswer: {
      type: String,
    },
    difficultyLevel: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    category: {
      type: String,
      default: 'General',
    },
    points: {
      type: Number,
      default: 1,
      min: 1,
      max: 100,
    },
    timeLimit: {
      type: Number, // in seconds
      default: 60,
      min: 10,
      max: 300,
    },

    // Author and User Interaction
    feedback: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },

    // Meta Fields for Organization and Search
    keywords: {
      type: [String],
      default: [],
    },
    relatedQuestions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],

    // Analytics and Insights
    averageTimeTaken: {
      type: Number,
      default: 0,
    },
    correctAnswerPercentage: {
      type: Number,
      default: 0,
    },
    commonIncorrectAnswers: {
      type: [String],
      default: [],
    },

    // Versioning and Data Retention
    version: {
      type: Number,
      default: 1,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },

    // Audit Trail
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    // Attachments and Additional Information
    attachments: {
      type: [String],
      default: [],
    },
    questionType: {
      type: String,
      enum: [
        'Multiple Choice',
        'True/False',
        'Fill in the Blank',
        'Short Answer',
        'Matching',
        'Essay',
        'Interactive',
        'Coding',
        'Audio/Visual',
        'Diagram-Based',
        'Survey',
        'Other',
      ],
      default: 'Multiple Choice',
    },
    customFields: {
      type: Schema.Types.Mixed,
      default: {},
    },
    questionPools: [
      {
        type: Schema.Types.ObjectId,
        ref: 'QuestionPool',
      },
    ],
    reviewStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for Optimized Queries
QuestionSchema.index({
  text: 'text',
  category: 1,
  difficultyLevel: 1,
  tags: 1,
});

QuestionSchema.index({ isActive: 1, isDeleted: 1 });

export const QuestionModel = mongoose.model<IQuestion>('Question', QuestionSchema);
