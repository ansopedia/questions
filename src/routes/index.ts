import express from 'express';
import questionRoutes from './question';
import { categoryRoutes } from './category/category.routes';

export const routes = express.Router();

routes.use(questionRoutes, categoryRoutes);
