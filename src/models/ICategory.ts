import { ObjectId } from 'mongodb';
import { Status } from '../types/types';
import { DifficultyLevel } from '../utils/enums';

export interface IAccessControl {
  roles: string[];
  collaborators: string[];
}

export interface ICategory {
  // Basic category information
  _id?: ObjectId;
  name: string;
  parentId: ObjectId;
  description: string;
  slug: string;

  // Visibility and activity status
  isDeleted: boolean;
  isActive: boolean;

  // Tracking creators and updaters
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;

  // Metadata and categorization
  metadata: {
    keywords: string[];
    resources: string[]; // Links or references to external resources
    thumbnail?: string;
    description: string;
  };
  tags: string[];

  accessControl: IAccessControl;
  featuredImage: string;
}

export interface ISubject extends ICategory {
  code?: string; // Unique identifier for reference
  content: ICategory[]; // Array of linked chapters
  // - resources: Resource[]; // List of additional resources related to the subject
}

export interface IChapter extends ICategory {
  subject: ISubject; // Reference to the parent subject
  position?: number; // Order within the subject (optional)
  content: ICategory[]; // Array of linked topics
}

export interface ITopic extends ICategory {
  chapter: IChapter; // Reference to the parent chapter
  position?: number; // Order within the chapter (optional)
  content: (IQuestion[] | ICategory[])[]; // Union type for mixed content (questions, quiz, other resources)
}

export interface IQuestion extends ICategory {
  //   type: QuestionType; // Define possible question types (e.g., multiple choice, open ended)
  difficultyLevel?: DifficultyLevel; // Optional difficulty level
  correctAnswer: string; // Can be string, array, object depending on question type
  incorrectAnswers?: string[]; // Optional array of incorrect answers
  explanation?: string; // Optional explanation for the answer
}

export interface IExam extends ICategory {
  subject: ISubject; // Reference to the subject
  duration?: number; // Duration in minutes (optional)
  passingScore?: number; // Minimum score to pass (optional)
  questions: IQuestion[]; // Array of questions used in the exam
}

export interface Resource {
  _id: string;
  name: string;
  type: ResourceType; // Enum defining different types of resources (e.g., "Book", "Website", "Video")
  url: string;
}

enum ResourceType {
  Book = 'Book',
  Website = 'Website',
  Video = 'Video',
}
