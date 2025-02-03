import boot from './utils/boot.js';
import './config.js';

import express from 'express';
import { getBalance } from './services/balanceService.js';
import router from './routes/index.js';
import { cors, sendResponse } from 'shared';
import ChainSchema from 'shared/schemas/chain.js';
import TokenSchema from 'shared/schemas/token.js';

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

// getBalance(
//   '0xc7dc7dfeb183a5a803c64b765c194a6bbe333c48',
//   'https://mainnet.infura.io/v3/712673c36b6b4d9687277c92cec0e89c'
//   // '0x0000000000000000000000000000000000000000'
// );

export default app;

// fetch();
