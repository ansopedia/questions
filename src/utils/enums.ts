export enum CategoryType {
  DEFAULT = 'default',
  SUBJECT = 'subject',
  COURSE = 'course',
  TOPIC = 'topic',
  MODULE = 'module',
  QUIZ = 'quiz',
  LESSON = 'lesson',
}

export enum DifficultyLevel {
  DEFAULT = 'default',
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert',
}

export enum ContentType {
  VIDEO = 'video',
  ARTICLE = 'article',
  PDF = 'pdf',
  PRESENTATION = 'presentation',
  INTERACTIVE_EXERCISE = 'interactive-exercise',
}

export enum AccessControlType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  RESTRICTED = 'restricted',
}

export enum CategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFTED = 'drafted',
  ARCHIVED = 'archived',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DELETED = 'deleted',
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished',
  EXPIRED = 'expired',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  NOT_STARTED = 'not_started',
}
