import { Request, Response } from 'express';
import { sendApiResponse } from '../utils/sendApiResponse';
import { CategoryProvider } from '../providers/CategoryProvider';
import { STATUS_CODES } from '../constants/statusCode/status-code.constants';
import { INTERNAL_SERVER_ERROR } from '../constants';
import { CategoryDto } from '../dto/CategoryDto';

export class CategoryController {
  static async createCategory(request: Request, response: Response) {
    try {
      const { name, description, userId, parentId } = request.body;

      if (parentId) {
        const category = await CategoryProvider.getCategoryById(parentId);

        if (!category) {
          sendApiResponse({
            response,
            message: 'parent category does not exist',
            statusCode: STATUS_CODES.BAD_REQUEST,
          });
          return;
        }
      }

      const newCategory = await CategoryProvider.createCategory({
        name,
        description,
        createdBy: userId,
        parentId,
      });

      const categoryDto = new CategoryDto(newCategory);

      sendApiResponse({
        response,
        message: 'Category created successfully',
        statusCode: STATUS_CODES.CREATED,
        payload: { category: categoryDto.getCategory() },
      });
    } catch (error) {
      sendApiResponse({
        response,
        message: INTERNAL_SERVER_ERROR,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error as Error,
      });
    }
  }

  static async getCategories(_: Request, response: Response) {
    try {
      const categories = await CategoryProvider.getCategories();
      const categoryDto = categories.map(
        (category) => new CategoryDto(category),
      );

      sendApiResponse({
        response,
        message: 'Categories fetched successfully',
        statusCode: STATUS_CODES.OK,
        payload: {
          categories: categoryDto.map((category) => category.getCategory()),
        },
      });
    } catch (error) {
      sendApiResponse({
        response,
        message: INTERNAL_SERVER_ERROR,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error as Error,
      });
    }
  }

  static async getCategoryById(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const category = await CategoryProvider.getCategoryById(id);

      if (!category) {
        sendApiResponse({
          response,
          message: 'Category does not exist',
          statusCode: STATUS_CODES.NOT_FOUND,
        });
        return;
      }

      const categoryDto = new CategoryDto(category);

      sendApiResponse({
        response,
        message: 'Category fetched successfully',
        statusCode: STATUS_CODES.OK,
        payload: { category: categoryDto.getCategory() },
      });
    } catch (error) {
      sendApiResponse({
        response,
        message: INTERNAL_SERVER_ERROR,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error as Error,
      });
    }
  }

  static async updateCategory(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { name, description, userId, parentId } = request.body;

      const category = await CategoryProvider.updateCategory(id, {
        name,
        description,
        updatedBy: userId,
        parentId,
      });

      if (!category) {
        sendApiResponse({
          response,
          message: 'Category does not exist',
          statusCode: STATUS_CODES.NOT_FOUND,
        });
        return;
      }

      const categoryDto = new CategoryDto(category);

      sendApiResponse({
        response,
        message: 'Category updated successfully',
        statusCode: STATUS_CODES.OK,
        payload: { category: categoryDto.getCategory() },
      });
    } catch (error) {
      sendApiResponse({
        response,
        message: INTERNAL_SERVER_ERROR,
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
        errors: error as Error,
      });
    }
  }
}
