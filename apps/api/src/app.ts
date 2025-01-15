import express from 'express';
import { HttpError } from './http';
import { tokensRouter } from './routers/tokens';

export const app = express();
app.use(
  express.json({
    limit: '1mb',
  }),
);
app.use(
  express.urlencoded({
    limit: '10mb',
  }),
);

// app configurations can be set here
// app.set('x-powered-by', false);
// app.set('etag', false);

app.get('/', (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/tokens', tokensRouter);

app.use(
  (
    error: unknown,
    request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    if (error instanceof HttpError) {
      response.status(error.status).json({ error: error.message });
    }

    response.status(500).json({ error: 'Something went wrong' });
  },
);
