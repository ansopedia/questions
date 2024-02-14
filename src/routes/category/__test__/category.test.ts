import request from 'supertest';
import { app } from '../../../server';
import { CREATE_CATEGORY_ROUTE } from '../../../constants/routes/category.constants';
import {
  CATEGORY_CREATED_SUCCESSFULLY,
  CATEGORY_NAME_LENGTH_ERROR,
  CATEGORY_NAME_REQUIRED_ERROR,
  PARENT_CATEGORY_NOT_FOUND_ERROR,
} from '../../../constants/category';

import {
  INVALID_OBJECT_ID_ERROR,
  VALIDATION_ERROR,
} from '../../../constants/common';

describe('Create Category Routes Test', () => {
  it('should return 201 for POST /category', async () => {
    const res = await request(app).post(CREATE_CATEGORY_ROUTE).send({
      name: 'test-category',
      description: 'test-description',
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe(CATEGORY_CREATED_SUCCESSFULLY);
  });

  it('should return 422 if length of name is less than 3 for POST /category', async () => {
    const res = await request(app).post(CREATE_CATEGORY_ROUTE).send({
      name: 'te',
      description: 'test-description',
    });

    expect(res.status).toBe(422);
    expect(res.body.message).toBe(VALIDATION_ERROR);
    expect(res.body.errors[0].msg).toBe(CATEGORY_NAME_LENGTH_ERROR);
  });

  it('should return 422 if length of name is greater than 100 for POST /category', async () => {
    const res = await request(app)
      .post(CREATE_CATEGORY_ROUTE)
      .send({
        name: 't'.repeat(101),
        description: 'test-description',
      });

    expect(res.status).toBe(422);
    expect(res.body.message).toBe(VALIDATION_ERROR);
    expect(res.body.errors[0].msg).toBe(CATEGORY_NAME_LENGTH_ERROR);
  });

  it('should return 422 if name is empty for POST /category', async () => {
    const res = await request(app).post(CREATE_CATEGORY_ROUTE).send({
      name: '',
      description: 'test-description',
    });

    expect(res.status).toBe(422);
    expect(res.body.message).toBe(VALIDATION_ERROR);
    expect(res.body.errors[0].msg).toBe(CATEGORY_NAME_REQUIRED_ERROR);
  });

  it('should return validation error if parent category is invalid for POST /category', async () => {
    const res = await request(app).post(CREATE_CATEGORY_ROUTE).send({
      name: 'test-category',
      description: 'test-description',
      parentId: 'invalid-id',
    });

    expect(res.status).toBe(422);
    expect(res.body.message).toBe(VALIDATION_ERROR);
    expect(res.body.errors[0].msg).toBe(INVALID_OBJECT_ID_ERROR);
  });

  it('should return does not exist if parent category does not exist for POST /category', async () => {
    const createParentCategory = await request(app)
      .post(CREATE_CATEGORY_ROUTE)
      .send({
        name: 'test-category',
        description: 'test-description',
      });

    const { id } = createParentCategory.body.category;

    const res = await request(app)
      .post(CREATE_CATEGORY_ROUTE)
      .send({
        name: 'test-category',
        description: 'test-description',
        parentId: id.slice(0, -3) + '101',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(PARENT_CATEGORY_NOT_FOUND_ERROR);
  });

  it('should create category successfully if parent category exists for POST /category', async () => {
    const createParentCategory = await request(app)
      .post(CREATE_CATEGORY_ROUTE)
      .send({
        name: 'test-category',
        description: 'test-description',
      });

    const { id } = createParentCategory.body.category;

    const res = await request(app).post(CREATE_CATEGORY_ROUTE).send({
      name: 'test-category',
      description: 'test-description',
      parentId: id,
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe(CATEGORY_CREATED_SUCCESSFULLY);
  });
});
