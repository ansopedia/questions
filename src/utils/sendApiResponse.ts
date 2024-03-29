import { Response } from 'express';
import { NODE_ENV } from '../constants';
import logger from './Logger';

type ApiResponse = {
  response: Response;
  statusCode: number;
  message: string;
  errors?: Error;
  payload?: Record<string, unknown>;
};

export const sendApiResponse = ({ response, statusCode, message, errors, payload }: ApiResponse) => {
  const isProduction = NODE_ENV === 'production';
  const responseBody: Record<string, unknown> = { message };

  if (!isProduction) {
    responseBody.errors = errors?.message;
    responseBody.stack = errors?.stack;
  }

  if (payload) {
    Object.assign(responseBody, payload);
  }

  if (errors) {
    logger.error(errors);
  }

  response.status(statusCode).json(responseBody);
};
