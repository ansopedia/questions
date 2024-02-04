import { NextFunction, Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { sendApiResponse } from '../utils/sendApiResponse';
import { STATUS_CODES } from '../constants/statusCode/status-code.constants';
import { INTERNAL_SERVER_ERROR, NODE_ENV } from '../constants';
import { VERIFY_ACCESS_TOKEN_ROUTE } from '../constants/routes/services.constants';

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
  if (NODE_ENV === 'test') {
    req.body.userId = 'test-user-id';
    req.body.role = 'test-role';
    return next();
  }
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

    const fetchResponse = await fetch(VERIFY_ACCESS_TOKEN_ROUTE, {
      headers: {
        authorization,
      },
    });
    const body = await fetchResponse.json();
    if (!fetchResponse.ok) {
      return sendApiResponse({
        response,
        statusCode: fetchResponse.status,
        message: body.message,
      });
    }

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
