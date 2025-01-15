import { tokenDao } from '../../daos/tokens';
import { createHandler, createRoute, Endpoint, HttpResponse } from '../../http';
import zod from 'zod';
import { pool } from '../../pool';

export const getToken = createRoute({
  endpoint: new Endpoint<{ id: number }>('get', '/tokens/:id'),
  handler: createHandler({
    bodySchema: zod.object({}),
    process: async ({ params }) => {
      const token = await tokenDao.selectById(pool, { id: params.id });
      return new HttpResponse(200, token);
    },
  }),
});
