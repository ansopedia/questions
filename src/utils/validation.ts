import { check } from 'express-validator';
import {
  CATEGORY_NAME_LENGTH_ERROR,
  CATEGORY_NAME_REQUIRED_ERROR,
  DESCRIPTION_LENGTH_ERROR,
} from '../constants/category';

import {
  INVALID_SLUG_ERROR,
  INVALID_OBJECT_ID_ERROR,
  SLUG_LENGTH_ERROR,
  SLUG_REQUIRED_ERROR,
} from '../constants/common';

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
    .withMessage(CATEGORY_NAME_REQUIRED_ERROR)
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage(CATEGORY_NAME_LENGTH_ERROR)
    .bail()
    .trim()
    .escape(),
];

export const validateUpdateCategoryFields = [
  check('name')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage(CATEGORY_NAME_LENGTH_ERROR)
    .trim()
    .escape(),
  check('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage(DESCRIPTION_LENGTH_ERROR)
    .trim()
    .escape(),
  check('slug')
    .optional()
    .isLength({ min: 3, max: 255 })
    .withMessage(SLUG_LENGTH_ERROR)
    .matches(/^[a-z0-9-]+$/)
    .withMessage(INVALID_SLUG_ERROR)
    .escape(),
];

export const isValidObjectId = [
  check('parentId')
    .optional()
    .matches(/^[a-f\d]{24}$/i)
    .withMessage(INVALID_OBJECT_ID_ERROR)
    .bail(),
  check('id')
    .optional()
    .matches(/^[a-f\d]{24}$/i)
    .withMessage(INVALID_OBJECT_ID_ERROR)
    .bail(),
];

export const validateSlug = [
  check('slug')
    .notEmpty()
    .withMessage(SLUG_REQUIRED_ERROR)
    .isLength({ min: 3, max: 255 })
    .withMessage(SLUG_LENGTH_ERROR)
    .matches(/^[a-z0-9-]+$/)
    .withMessage(INVALID_SLUG_ERROR)
    .escape(),
];
