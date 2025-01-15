import express from 'express';

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
