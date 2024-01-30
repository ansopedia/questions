import { CategoryModel, ICategory } from '../models/category';

interface ICreateCategory {
  name: string;
  description: string;
  createdBy: string;
  parentId?: string;
}

export class CategoryProvider {
  static async createCategory({
    name,
    description,
    createdBy,
    parentId,
  }: ICreateCategory) {
    const createdCategory = new CategoryModel({
      name,
      description,
      createdBy,
      updatedBy: createdBy,
      parentId,
    });
    return createdCategory.save();
  }

  static async getCategories() {
    return CategoryModel.find().exec();
  }

  static async getCategoryById(categoryId: string) {
    return CategoryModel.findById(categoryId).exec();
  }

  static async updateCategory(
    categoryId: string,
    { name, description, updatedBy, parentId }: ICategory,
  ) {
    return CategoryModel.findByIdAndUpdate(
      categoryId,
      { name, description, updatedBy, parentId },
      {
        new: true,
      },
    );
  }

  static async deleteCategory(categoryId: string) {
    return CategoryModel.findByIdAndUpdate(categoryId, { isDeleted: true });
  }
}
