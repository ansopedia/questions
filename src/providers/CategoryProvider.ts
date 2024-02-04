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
  slug?: string;
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

  static async getCategoryBySlug(slug: string): Promise<ICategory | null> {
    return CategoryModel.findOneAndUpdate(
      { slug, isDeleted: false },
      { $inc: { 'analytics.views': 1 } },
      { new: true },
    );
  }

  static async isSlugExist(slug: string) {
    return CategoryModel.findOne({ slug });
  }

  static async getCategoryByParentId(
    parentId: string | null,
    { offset = 0, limit = 10 }: { offset?: number; limit?: number },
  ) {
    return CategoryModel.find({ parentId, isDeleted: false })
      .limit(limit)
      .skip(offset);
  }

  static async updateCategory(
    categoryId: string,
    { name, description, updatedBy, parentId, slug }: IUpdateCategory,
  ): Promise<ICategory | null> {
    return CategoryModel.findByIdAndUpdate(
      categoryId,
      { name, description, updatedBy, parentId, slug },
      { new: true, runValidators: true },
    );
  }

  static async softDeleteCategory(
    categoryId: string,
    { updatedBy }: { updatedBy: string },
  ) {
    return CategoryModel.findByIdAndUpdate(
      categoryId,
      { isDeleted: true, updatedBy },
      { new: true },
    );
  }
}
