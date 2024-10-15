import { SiweMessage } from 'siwe';
import { sendResponse } from '../utils/helpers.js';
import redis from '../utils/redis.js';

export const requestLogin = async (req, res) => {
  const { address } = req.body;
  let siweMessage;
  try {
    siweMessage = new SiweMessage({
      domain: process.env.DOMAIN,
      address,
      statement: 'Sign in with Ethereum to the application.',
      uri: process.env.BASE_URL,
      version: '1',
      chainId: '1', // Mainnet (Change this if needed)
      nonce: Math.random().toString(36).substring(2, 15),
      issuedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.log(error);
    sendResponse(res, 400, 'BAD REQUEST');
    return;
  }

  const message = siweMessage?.prepareMessage();

  await redis.setEx(`login:${address}`, 60 * 3, siweMessage.nonce);

  sendResponse(res, 200, 'Success', { message });
};

export const verifyLogin = async (req, res) => {
  const { message, signature, address } = req.body;

  const key = `login:${address}`;
  const redisNonce = await redis.get(key);

  if (!redisNonce) {
    return sendResponse(res, 400, 'Request Not Found');
  }

  const siweMessage = new SiweMessage(message);
  const { _, nonce } = await siweMessage.validate(signature);

  if (redisNonce !== nonce) {
    return sendResponse(res, 400, 'Invalid Nonce');
  }

  sendResponse(res, 200, 'success');
};
