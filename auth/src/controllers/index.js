import { generateNonce, SiweMessage } from 'siwe';
import redis from 'shared/utils/redis.js';
import { createSIWEMessage, sendResponse, verifySIWEMessage } from 'shared';
import logger from 'shared/utils/logger.js';
import { ethers } from 'ethers';
import axios from 'shared/utils/axios.js';

export const requestLogin = async (req, res) => {
  const { address } = req.body;
  const siweMessage = await createSIWEMessage({ address, statement: '' });

  if (!siweMessage) {
    return sendResponse(res, 400, 'cannot create login request');
  }

  sendResponse(res, 200, 'Success', { message: siweMessage });
};

export const verifyLogin = async (req, res) => {
  const { signature, address } = req.body;

  const err = await verifySIWEMessage({ signature, address });

  if (err) {
    return sendResponse(res, 400, err);
  }

  sendResponse(res, 200, 'success');
};
