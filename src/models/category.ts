import mongoose, { Document, Schema } from 'mongoose';
import { CategoryType, DifficultyLevel } from '../utils/enums';
import { AccessControlObject } from '../types/types';

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
    favorites: number;
    enrollments: number;
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
    code: string;
    message?: string;
    updatedBy: string;
    updatedAt: Date;
  };

  // Educational specific fields
  language: string;
  duration: string;

  // Educational & LMS specific fields
  difficultyLevel: DifficultyLevel;
  accessControl: AccessControlObject;

  // Quiz specific fields
  quizQuestions: Schema.Types.ObjectId[];
  passingScore: number;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    parentId: { type: Schema.Types.ObjectId, ref: 'Category' },
    description: { type: String, maxlength: 500 },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    featuredImage: { type: String },
    analytics: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      rating: { type: Number, default: 0 },
      favorites: { type: Number, default: 0 },
      enrollmentCount: { type: Number, default: 0 },
    },
    accessControl: {
      roles: {
        type: [String],
        default: ['admin', 'super-admin', 'editor'],
      },
      collaborators: {
        type: [String],
        default: [],
      },
    },
  },
  { timestamps: true },
);

CategorySchema.pre('save', function (next) {
  if (this.isNew) {
    this.accessControl.collaborators = [this.createdBy];
  }
  this.accessControl.collaborators = [...new Set(this.accessControl.collaborators)];
  this.accessControl.roles = [...new Set(this.accessControl.roles)];

  next();
});

export const CategoryModel = mongoose.model<ICategory>('Category', CategorySchema);
