import { generateUniqueSlug } from '../helpers/generateSlug';
import { CategoryModel, ICategory } from '../models/category';

interface ICreateCategory {
  name: string;
  description: string;
  createdBy: string;
  parentId?: string;
}

interface IUpdateCategory {
  name: string;
  description: string;
  updatedBy: string;
  parentId?: string;
}

export class CategoryProvider {
  static async createCategory({
    name,
    description,
    createdBy,
    parentId,
  }: ICreateCategory) {
    const slug = await generateUniqueSlug(name, CategoryModel);
    const createdCategory = new CategoryModel({
      name,
      description,
      createdBy,
      updatedBy: createdBy,
      parentId,
      slug,
    });
    return createdCategory.save();
  }

  static async getCategories() {
    return CategoryModel.find();
  }

  static async getCategoryById(categoryId: string): Promise<ICategory | null> {
    return CategoryModel.findById(categoryId);
  }

  static getCategoryBySlug(slug: string): Promise<ICategory | null> {
    return CategoryModel.findOneAndUpdate(
      { slug, isDeleted: false },
      { $inc: { 'analytics.views': 1 } },
      { new: true },
    );
  }

  static async getCategoryByParentId(parentId: string | null) {
    return CategoryModel.find({ parentId, isDeleted: false });
  }

  static async updateCategory(
    categoryId: string,
    { name, description, updatedBy, parentId }: IUpdateCategory,
  ): Promise<ICategory | null> {
    return CategoryModel.findByIdAndUpdate(
      categoryId,
      { name, description, updatedBy, parentId },
      { new: true, runValidators: true },
    );
  }

  static async deleteCategory(categoryId: string) {
    return CategoryModel.findByIdAndUpdate(categoryId, { isDeleted: true });
  }
}
