import { BASE_URL } from './api-routes.constants';

export const GET_CATEGORY_ROUTE = `${BASE_URL}/category/:slug`;
export const GET_CATEGORIES_ROUTE = `${BASE_URL}/category`;
export const CREATE_CATEGORY_ROUTE = `${BASE_URL}/category`;
export const UPDATE_CATEGORY_ROUTE = `${BASE_URL}/category/:id`;
export const DELETE_CATEGORY_ROUTE = `${BASE_URL}/category/:id`;
