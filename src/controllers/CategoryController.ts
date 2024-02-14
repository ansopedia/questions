import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { sendApiResponse } from '../utils/sendApiResponse';
import { CategoryProvider } from '../providers/CategoryProvider';
import { STATUS_CODES } from '../constants/statusCode/status-code.constants';
import { INTERNAL_SERVER_ERROR } from '../constants';
import { CategoryDto } from '../dto/CategoryDto';
import {
  CATEGORY_CREATED_SUCCESSFULLY,
  CATEGORY_DELETED_SUCCESSFULLY,
  CATEGORY_FETCHED_SUCCESSFULLY,
  CATEGORY_NOT_FOUND_ERROR,
  CATEGORY_UPDATED_SUCCESSFULLY,
  COLLABORATOR_ADDED_SUCCESSFULLY,
  FAILED_TO_UPDATE_CATEGORY,
  NOT_AUTHORIZED_TO_UPDATE_CATEGORY,
  PARENT_CATEGORY_NOT_FOUND_ERROR,
} from '../constants/category';
import { SLUG_EXISTS_ERROR } from '../constants/common';
import { isAuthorizedToPerformAction } from '../helpers';
import { uploadFileToCloudinary } from '../utils/uploadFile';

export class CategoryController {
  static async createCategory(request: Request, response: Response) {
    try {
      const { name, description, userId, parentId } = request.body;

      if (parentId) {
        const category = await CategoryProvider.getCategoryById(parentId);

        if (!category) {
          return sendApiResponse({
            response,
            message: PARENT_CATEGORY_NOT_FOUND_ERROR,
            statusCode: STATUS_CODES.BAD_REQUEST,
          });
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
        message: CATEGORY_CREATED_SUCCESSFULLY,
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

  static async getCategories(request: Request, response: Response) {
    try {
      const { offset, limit } = request.query;
      const categories = await CategoryProvider.getCategoryByParentId(null, {
        offset: Number(offset),
        limit: Number(limit),
      });

      const categoryDto = categories.map((category) => new CategoryDto(category).getCategory());

      sendApiResponse({
        response,
        message: CATEGORY_FETCHED_SUCCESSFULLY,
        statusCode: STATUS_CODES.OK,
        payload: {
          categories: categoryDto,
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

  static async getCategoryBySlug(request: Request, response: Response) {
    try {
      const { slug } = request.params;
      const { offset, limit } = request.query;

      const category = await CategoryProvider.getCategoryBySlug(slug);

      if (!category) {
        return sendApiResponse({
          response,
          message: CATEGORY_NOT_FOUND_ERROR,
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      const children = await CategoryProvider.getCategoryByParentId(category._id, {
        offset: Number(offset),
        limit: Number(limit),
      });

      const categoryDto = new CategoryDto(category).getCategory();

      const categoryWithChildren = {
        ...categoryDto,
        children: children.map((child) => new CategoryDto(child).getCategory()),
      };

      sendApiResponse({
        response,
        message: CATEGORY_FETCHED_SUCCESSFULLY,
        statusCode: STATUS_CODES.OK,
        payload: { category: categoryWithChildren },
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
      const { name, description, userId, parentId, slug, role } = request.body;

      const foundCategory = await CategoryProvider.getCategoryById(id);

      if (!foundCategory || foundCategory.isDeleted) {
        return sendApiResponse({
          response,
          message: CATEGORY_NOT_FOUND_ERROR,
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      if (parentId) {
        const category = await CategoryProvider.getCategoryById(parentId);

        if (!category) {
          return sendApiResponse({
            response,
            message: PARENT_CATEGORY_NOT_FOUND_ERROR,
            statusCode: STATUS_CODES.BAD_REQUEST,
          });
        }
      }

      if (slug) {
        const isSlugExists = await CategoryProvider.isSlugExist(slug);
        if (isSlugExists) {
          return sendApiResponse({
            response,
            message: SLUG_EXISTS_ERROR,
            statusCode: STATUS_CODES.CONFLICT,
          });
        }
      }

      if (!isAuthorizedToPerformAction(foundCategory, userId, role)) {
        return sendApiResponse({
          response,
          message: NOT_AUTHORIZED_TO_UPDATE_CATEGORY,
          statusCode: STATUS_CODES.UNAUTHORIZED,
        });
      }

      const category = await CategoryProvider.updateCategory(id, userId, {
        name,
        description,
        parentId,
        slug,
      });

      if (!category) {
        return sendApiResponse({
          response,
          message: FAILED_TO_UPDATE_CATEGORY,
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      const categoryDto = new CategoryDto(category);

      sendApiResponse({
        response,
        message: CATEGORY_UPDATED_SUCCESSFULLY,
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

  static async softDeleteCategory(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { userId } = request.body;

      const updatedCategory = await CategoryProvider.softDeleteCategory(id, {
        updatedBy: userId,
      });

      if (!updatedCategory) {
        return sendApiResponse({
          response,
          message: CATEGORY_NOT_FOUND_ERROR,
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      const categoryDto = new CategoryDto(updatedCategory);

      sendApiResponse({
        response,
        message: CATEGORY_DELETED_SUCCESSFULLY,
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

  static async uploadCategoryImage(request: Request, response: Response) {
    const uploadedFile = request.files?.file as UploadedFile;

    const { id } = request.params;
    const { userId } = request.body;

    try {
      const category = await CategoryProvider.getCategoryById(id);

      if (!category) {
        return sendApiResponse({
          response,
          message: CATEGORY_NOT_FOUND_ERROR,
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      const result = await uploadFileToCloudinary({
        folder: 'ansopedia/category/featured-images',
        public_id: id,
        uploadedFile,
      });

      const updateCategory = await CategoryProvider.updateCategory(id, userId, {
        featuredImage: result.url,
      });

      if (!updateCategory) {
        return sendApiResponse({
          response,
          message: FAILED_TO_UPDATE_CATEGORY,
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      const categoryDto = new CategoryDto(updateCategory).getCategory();

      return sendApiResponse({
        response,
        message: 'File uploaded successfully',
        statusCode: STATUS_CODES.OK,
        payload: { category: categoryDto },
      });
    } catch (error) {
      return sendApiResponse({
        response,
        message: 'Upload failed',
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      });
    }
  }

  static async addCollaborator(request: Request, response: Response) {
    const { id } = request.params;
    const { userId: collaborator } = request.body;

    try {
      const category = await CategoryProvider.getCategoryById(id);

      if (!category) {
        return sendApiResponse({
          response,
          message: CATEGORY_NOT_FOUND_ERROR,
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      const updatedCategory = await CategoryProvider.addCollaborator(id, collaborator);

      if (!updatedCategory) {
        return sendApiResponse({
          response,
          message: FAILED_TO_UPDATE_CATEGORY,
          statusCode: STATUS_CODES.NOT_FOUND,
        });
      }

      const categoryDto = new CategoryDto(updatedCategory).getCategory();

      sendApiResponse({
        response,
        message: COLLABORATOR_ADDED_SUCCESSFULLY,
        statusCode: STATUS_CODES.OK,
        payload: { category: categoryDto },
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
