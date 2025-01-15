import * as userDao from '../../daos/users';
import { pool } from '../../pool';
import express from 'express';
import zod from 'zod';
import crypto from 'node:crypto';
import { HttpError } from '../../http';
import { tokenDao } from '../../daos/tokens';

const bodySchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

export const createToken = async (
  request: express.Request,
  response: express.Response,
) => {
  const body = bodySchema.parse(request.body);
  const user = await userDao.selectByUsername(pool, {
    username: body.username,
  });

  if (!user) {
    throw new HttpError(401, 'Invalid username or password');
  }

  if (user.password !== crypto.hash('sha256', body.password)) {
    throw new HttpError(401, 'Invalid username or password');
  }

  const token = await tokenDao.createToken(pool, { userId: user.id });
  response.status(201).json(token);
};
