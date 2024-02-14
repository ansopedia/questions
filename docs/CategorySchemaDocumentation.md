# Category Model

## Description

This model defines the structure and behavior of categories within the application, enabling the organization of content and hierarchical relationships. It encompasses a wide range of fields, catering to various content types, analytics, user interactions, and educational features.

## Key Features

- **Hierarchical Structure:** Supports parent-child relationships for nested categories.
- **Comprehensive Analytics:** Tracks views, likes, comments, shares, ratings, favorites, enrollments, and more.
- **User Interactions:** Records individual user actions, including likes, comments, and ratings.
- **Metadata and Categorization:** Enables rich categorization and search capabilities through keywords, descriptions, tags, and related categories.
- **Content Management:** Accommodates various content types, including courses, quizzes, and general topics.
- **Educational Features:** Supports language, duration, difficulty level, access control, and quiz-specific functionality.
- **Status Tracking:** Monitors category status (published, pending, in review) with details on updates.
- **Media Integration:** Allows for visual enhancements with color, icons, and featured images.

## Fields

### Basic Information

- `name`: The name of the category.
- `parentId`: The ID of the parent category.
- `description`: A brief description of the category.
- `slug`: A unique slug for the category.

### Visibility and Activity Status

- `isDeleted`: A flag indicating whether the category is deleted.
- `isActive`: A flag indicating whether the category is active.

### Tracking Creators and Updaters

- `createdBy`: The user who created the category.
- `updatedBy`: The user who last updated the category.

### Analytics and User Interactions

- `analytics`: An object containing analytics data for the category, such as views, likes, comments, shares, rating, favorites, and enrollment count.
- `userInteractions`: An object containing user interaction data for the category, such as likes, comments, and ratings.

### Metadata and Categorization

- `metadata`: An object containing metadata for the category, such as keywords and description.
- `tags`: An array of tags associated with the category.
- `relatedCategories`: An array of IDs of related categories.
- `type`: The type of the category (quiz, course, or subject).

### Media Content

- `color`: The color associated with the category.
- `icon`: The icon for the category.
- `featuredImage`: The featured image for the category.

### Status Information

- `status`: An object containing status information for the category, such as code, message, updated by, and updated at.

### Educational Specific Fields

- `language`: The language of the category.
- `duration`: The duration of the category.

### Educational & LMS Specific Fields

- `difficultyLevel`: The difficulty level of the category (beginner, intermediate, advanced).
- `accessControl`: An object defining user roles/groups allowed access.

### Quiz Specific Fields

- `quizQuestions`: An array of IDs of quiz questions associated with the category.
- `passingScore`: The passing score required to pass the quiz.

## TODO

- Add validation for fields.
- If the type is 'quiz', then the category must have a passing score.
- If the type is 'quiz', then the category must have a list of quiz questions.
- If the type is 'course', then only user can be enrolled in the course.
- If the type is 'subject', then the category must have a difficulty level.
