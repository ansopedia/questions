import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { UploadedFile } from 'express-fileupload';

interface IFileUpload {
  folder: string;
  public_id: string;
  resource_type?: 'image' | 'video';
  uploadedFile: UploadedFile;
}

export const uploadFileToCloudinary = async ({
  uploadedFile,
  public_id,
  resource_type = 'image',
  folder,
}: IFileUpload): Promise<UploadApiResponse> => {
  const fileBuffer = uploadedFile.data;
  const fileStr = fileBuffer.toString('base64');

  return cloudinary.uploader.upload(`data:${uploadedFile.mimetype};base64,${fileStr}`, {
    folder,
    overwrite: true,
    public_id,
    resource_type,
  });
};
