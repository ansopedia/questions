import express, { Request, Response } from 'express';
import { handleValidationErrors } from '../../middlewares';
import { sendApiResponse } from '../../utils/sendApiResponse';
import { INTERNAL_SERVER_ERROR, ADD_QUESTION_ROUTE } from '../../constants';
import { QuestionModel } from '../../models/question';
import { STATUS_CODES } from '../../constants/statusCode/status-code.constants';
import { validateQuestion } from '../../utils/validation';
const questionRoutes = express.Router();

questionRoutes.post(
  ADD_QUESTION_ROUTE,
  validateQuestion,
  handleValidationErrors,
  async (request: Request, response: Response) => {
    try {
      const {
        title,
        // choices,
        // quizId,
        // correctAnswer,
        // difficultyLevel,
        // category,
        // points,
        // timeLimit,
        // tags,
        // feedback,
        // isActive,
        createdBy,
      } = request.body;

      const newQuestion = new QuestionModel({
        title,
        // choices,
        // quizId,
        // correctAnswer,
        // difficultyLevel,
        // category,
        // points,
        // timeLimit,
        // tags,
        // feedback,
        // isActive,
        createdBy,
      });
      // console.log({ newQuestion });
      await newQuestion.save();

      sendApiResponse({
        response,
        message: 'Question added successfully',
        statusCode: STATUS_CODES.CREATED,
        payload: { question: newQuestion },
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

export default questionRoutes;
