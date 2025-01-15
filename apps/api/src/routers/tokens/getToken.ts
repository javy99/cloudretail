import { tokenDao } from '../../daos/tokens';
import { getTokenEndpoint } from '../../endpoints';
import { createHandler, createRoute, Fetcher, HttpResponse } from '../../http';
import { pool } from '../../pool';

export const getToken = createRoute({
  endpoint: getTokenEndpoint,
  handler: createHandler({
    process: async ({ params }) => {
      const token = await tokenDao.selectById(pool, { id: params.id });
      return new HttpResponse(200, token);
    },
  }),
});

export type GetTokenFetcher = Fetcher<typeof getToken.handler>;
