import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { sendApiResponse } from '../utils/sendApiResponse';
import { STATUS_CODES } from '../constants/statusCode/status-code.constants';
import { INTERNAL_SERVER_ERROR } from '../constants';

export const handleValidationErrors = (
  req: Request,
  response: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendApiResponse({
      response,
      statusCode: 422,
      message: 'Validation error',
      payload: { errors: errors.array() },
    });
    return;
  }
  next();
};

export const validateAccessTokens = async (
  req: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      sendApiResponse({
        response,
        statusCode: 401,
        message: 'Unauthorized',
      });
      return;
    }

    const verifyAccessToken = `http://localhost:8000/api/v1/auth/verify-access-token`;
    const fetchResponse = await fetch(verifyAccessToken, {
      headers: {
        authorization,
      },
    });

    if (!fetchResponse.ok) {
      throw new Error('Failed to verify access token');
    }

    const body = await fetchResponse.json();
    req.body.userId = body.userId;
    req.body.role = body.role;

    next();
  } catch (error) {
    sendApiResponse({
      response,
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: INTERNAL_SERVER_ERROR,
      errors: error as Error,
    });
  }
};
