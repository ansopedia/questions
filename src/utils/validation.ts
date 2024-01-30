import { check } from 'express-validator';

export const validateQuestion = [
  check('title').notEmpty().withMessage('Title is required').bail().trim(),
  check('createdBy').notEmpty().withMessage('Author is required').bail().trim(),
];

export const validateCategory = [
  check('name').notEmpty().withMessage('Name is required').bail().trim(),
];

export const isValidObjectId = [
  check('parentId')
    .optional()
    .matches(/^[a-f\d]{24}$/i)
    .withMessage('Invalid parent id')
    .bail(),
];
