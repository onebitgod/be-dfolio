import boot from './utils/boot.js';
import './config.js';
import express from 'express';
import router from './routes/index.js';
import { cors, sendResponse } from 'shared';
import QuoteSchema from 'shared/schemas/quote/quote.js';
import quoteResponseSchema from 'shared/schemas/quote/quoteResponse.js';
import CricketQuoteConditionSchema from 'shared/schemas/quote/cricketQuoteCondition.js';

const app = express();

app.set('reverse proxy', 1);
app.use(cors());
app.use(express.json({ limit: '5000kb' }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

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
  app.listen(process.env.PORT, async () => {
    console.log(`Service is listening on port ${process.env.PORT}`);
  });
});

export default app;
