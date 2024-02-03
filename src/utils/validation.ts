import { check } from 'express-validator';

export const validateQuestion = [
  check('title')
    .notEmpty()
    .withMessage('Title is required')
    .bail()
    .trim()
    .escape(),
  check('createdBy')
    .notEmpty()
    .withMessage('Author is required')
    .bail()
    .trim()
    .escape(),
];

export const validateCategory = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape(),
];

export const validateUpdateCategoryFields = [
  check('name')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Name cannot exceed 255 characters')
    .trim()
    .escape(),
  check('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim()
    .escape(),
];

export const isValidObjectId = [
  check('parentId')
    .optional()
    .matches(/^[a-f\d]{24}$/i)
    .withMessage('Invalid parent id')
    .bail(),
];

export const validateSlug = [
  check('slug')
    .notEmpty()
    .withMessage('Slug is required')
    .isLength({ min: 3, max: 255 })
    .withMessage('Slug must be between 3 and 255 characters')
    .matches(/^[a-z0-9-]+$/)
    .withMessage(
      'Slug must only contain lowercase letters, numbers, and hyphens',
    )
    .escape(),
];
