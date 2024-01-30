import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  parentId: Schema.Types.ObjectId;
  description: string;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
}

const CategorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: 'Category' },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: String, required: true },
    updatedBy: { type: String, required: true },
  },
  { timestamps: true },
);

export const CategoryModel = mongoose.model<ICategory>(
  'Category',
  CategorySchema,
);
