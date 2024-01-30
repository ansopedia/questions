import express from 'express';

import { isValidObjectId, validateCategory } from '../../utils/validation';
import { CREATE_CATEGORY_ROUTE } from '../../constants/routes/category.constants';
import {
  handleValidationErrors,
  validateAccessTokens,
} from '../../middlewares';
import { CategoryController } from '../../controllers/CategoryController';

export const categoryRoutes = express.Router();

categoryRoutes.post(
  CREATE_CATEGORY_ROUTE,
  validateCategory,
  isValidObjectId,
  handleValidationErrors,
  validateAccessTokens,
  CategoryController.createCategory,
);
