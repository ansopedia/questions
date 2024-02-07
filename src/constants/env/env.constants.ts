import dotenv from 'dotenv';
dotenv.config();

export const DATABASE_URI = process.env.DATABASE_URI ?? '';
export const APP_PORT = process.env.APP_PORT ?? 8001;
export const PINO_LOG_LEVEL = process.env.PINO_LOG_LEVEL;
export const NODE_ENV = process.env.NODE_ENV;

export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
