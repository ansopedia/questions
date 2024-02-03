import express from 'express';

import {
  isValidObjectId,
  validateCategory,
  validateSlug,
  validateUpdateCategoryFields,
} from '../../utils/validation';
import {
  CREATE_CATEGORY_ROUTE,
  GET_CATEGORIES_ROUTE,
  GET_CATEGORY_ROUTE,
  UPDATE_CATEGORY_ROUTE,
} from '../../constants/routes/category.constants';
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

categoryRoutes.get(GET_CATEGORIES_ROUTE, CategoryController.getCategories);

categoryRoutes.get(
  GET_CATEGORY_ROUTE,
  validateSlug,
  handleValidationErrors,
  CategoryController.getCategoryBySlug,
);

categoryRoutes.put(
  UPDATE_CATEGORY_ROUTE,
  validateUpdateCategoryFields,
  isValidObjectId,
  handleValidationErrors,
  validateAccessTokens,
  CategoryController.updateCategory,
);
