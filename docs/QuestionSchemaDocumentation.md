# Question Schema Documentation

## Overview

The `Question` schema represents a question within a quiz application. It encompasses essential information such as the question text, available choices, correct answer, and additional metadata for organization, analytics, and insights. The schema is designed to be flexible, allowing for various question types and customizable attributes.

## Core Question Information

- **quizId:** The reference to the quiz to which the question belongs.
- **title:** The main text of the question.
- **choices:** An array of references to the available choices for the question.
- **correctAnswer:** The correct answer to the question.
- **difficultyLevel:** The difficulty level of the question (Easy, Medium, Hard).
- **category:** The category to which the question belongs.
- **points:** The number of points assigned to the question.
- **timeLimit:** The time limit for answering the question (in seconds).

## Author and User Interaction

- **feedback:** Additional feedback or information related to the question.
- **tags:** An array of tags associated with the question.
- **isActive:** Indicates whether the question is active or not.
- **viewCount:** The count of how many times the question has been viewed.

## Meta Fields for Organization and Search

- **keywords:** An array of keywords for better organization and search.
- **relatedQuestions:** An array of references to questions related to the current one.

## Analytics and Insights

- **averageTimeTaken:** The average time taken by users to answer the question.
- **correctAnswerPercentage:** The percentage of users who answered the question correctly.
- **commonIncorrectAnswers:** An array of common incorrect answers given by users.

## Versioning and Data Retention

- **version:** The version number of the question.
- **isDeleted:** Indicates whether the question has been marked as deleted.

## Audit Trail

- **createdBy:** The user who created the question.
- **updatedBy:** The user who last updated the question.
- **createdAt:** The timestamp when the question was created.
- **updatedAt:** The timestamp when the question was last updated.

## Attachments and Additional Information

- **attachments:** An array of file references or attachments.
- **questionType:** The type of the question (Multiple Choice, True/False, etc.).
- **customFields:** A flexible field for storing custom metadata.
- **questionPools:** An array of references to question pools.
- **reviewStatus:** The status of the question's review process (Pending, Approved, Rejected).

## Indexes for Optimized Queries

- Indexes have been created to optimize queries based on the text, category, difficultyLevel, tags, isActive, and isDeleted fields.

## Usage

The schema is intended to be used with MongoDB through Mongoose, providing a structured and scalable way to manage quiz questions in an application.
