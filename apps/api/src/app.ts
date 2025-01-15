import express from 'express';
import { ZodError } from 'zod';
import { createToken } from './routers/tokens/createToken';
import { HttpError } from './exceptions';

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

app[createToken.method](createToken.path, createToken.handler);

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.log(error);

    if (error instanceof HttpError) {
      response.status(error.status).json({ error: error.message });
    }

    if (error instanceof ZodError) {
      response.status(422).json({ error: error.errors });
    }

    response.status(500).json({ error: 'Something went wrong' });
  },
);
