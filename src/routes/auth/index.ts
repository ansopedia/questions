import express, { Request, Response } from 'express';
import { handleValidationErrors } from '../../middlewares';
import { sendApiResponse } from '../../utils/sendApiResponse';
import { INTERNAL_SERVER_ERROR, SIGN_UP } from '../../constants';
const authRoutes = express.Router();

authRoutes.post(
  SIGN_UP,
  handleValidationErrors,
  async (_: Request, response: Response) => {
    try {
      sendApiResponse({
        response,
        message: '',
        statusCode: 201,
        payload: { data: '' },
      });
    } catch (error) {
      sendApiResponse({
        response,
        message: INTERNAL_SERVER_ERROR,
        statusCode: 500,

        errors: error as Error,
      });
    }
  },
);

export default authRoutes;
