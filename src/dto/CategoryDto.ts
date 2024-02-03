import { ICategory } from '../models/category';

export class CategoryDto {
  private category: ICategory;

  constructor(category: ICategory) {
    this.category = category;
  }

  getCategory() {
    return {
      id: this.category._id,
      name: this.category.name,
      description: this.category.description,
      createdBy: this.category.createdBy,
      updatedBy: this.category.updatedBy,
      parentId: this.category.parentId,
      slug: this.category.slug,
      analytics: this.category.analytics,
    };
  }
}
