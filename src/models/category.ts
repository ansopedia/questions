import mongoose, { Document, Schema } from 'mongoose';
import { CategoryType, DifficultyLevel } from '../utils/enums';
import { AccessControlObject, Rating } from '../types/types';

// TODO: Add validation for fields
// If the type is 'quiz', then the category must have a passing score
// If the type is 'quiz', then the category must have a list of quiz questions
// If the type is 'course', then only user can be enrolled in the course
// If the type is 'subject', then the category must have a difficulty level

export interface ICategory extends Document {
  // Basic category information
  name: string;
  parentId: Schema.Types.ObjectId;
  description: string;
  slug: string;

  // Visibility and activity status
  isDeleted: boolean;
  isActive: boolean;

  // Tracking creators and updaters
  createdBy: string;
  updatedBy: string;

  // Analytics and user interactions
  analytics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    rating: Rating;
    favorites: number;
    enrollmentCount: number; // Number of users enrolled in the course
  };
  userInteractions: {
    likes: { userId: string; timestamp: Date }[];
    comments: { userId: string; comment: string; timestamp: Date }[];
  };

  // Metadata and categorization
  metadata: {
    keywords: string[];
    description: string;
  };
  tags: string[];
  relatedCategories: Schema.Types.ObjectId[];
  type: CategoryType;

  // Media content
  color: string;
  icon: string;
  featuredImage: string;

  // Status information
  status: {
    code: string; // Status code, e.g., 'published', 'pending', 'in review', etc.
    message?: string; // Optional status message
    updatedBy: string; // User who updated the status
    updatedAt: Date; // Timestamp when the status was last updated
  };

  // Educational specific fields
  language: string;
  duration: string;

  // Educational & LMS specific fields
  difficultyLevel: DifficultyLevel; // Enum for difficulty (e.g., beginner, intermediate, advanced)
  accessControl: AccessControlObject; // Object defining user roles/groups allowed access

  // Quiz specific fields
  quizQuestions: Schema.Types.ObjectId[]; // IDs of quiz questions associated with the category
  passingScore: number; // Passing score required to pass the quiz
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    slug: { type: String, required: true },
  },
  { timestamps: true },
);

export const CategoryModel = mongoose.model<ICategory>(
  'Category',
  CategorySchema,
);
