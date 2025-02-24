import boot from './utils/boot.js';
import './config.js';

import express from 'express';
import router from './routes/index.js';
import { cors, logger, sendResponse, sessionMiddleware } from 'shared';

const app = express();

app.set('reverse proxy', 1);
app.use(cors());
app.use(express.json({ limit: '5000kb' }));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(sessionMiddleware());

app.use(router);

app.use((req, res) => {
  sendResponse(res, 404, 'Route does not exist');
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err) {
    return sendResponse(res, err.statusCode, err.message, null, err.errors);
  }
  sendResponse(res, 500, err.message || 'Internal Server Error', null, err);
});

boot().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Service is listening on port ${process.env.PORT}`);
  });
});

export default app;
// "shared": "git+https://shared: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@github.com/onebitgod/shared#1.0.0",
