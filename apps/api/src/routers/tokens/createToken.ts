import crypto from 'node:crypto';
import zod from 'zod';
import { pool } from '../../pool';
import { tokenDao } from '../../daos/tokens';
import { userDao } from '../../daos/users';
import { HttpError } from '../../exceptions';
import { createHandler, Fetcher, HttpResponse } from '../../http';

export const createToken = {
  method: 'post' as const,
  path: '/tokens',
  handler: createHandler({
    bodySchema: zod.object({
      username: zod.string(),
      password: zod.string(),
    }),
    process: async ({ body }) => {
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
      return new HttpResponse(201, token);
    },
  }),
};

export type CreateTokenFetcher = Fetcher<typeof createToken.handler>;
