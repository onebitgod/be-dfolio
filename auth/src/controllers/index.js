import { generateNonce, SiweMessage } from 'siwe';
import redis from 'shared/utils/redis.js';
import {
  AccountSchema,
  createSIWEMessage,
  generateAccessToken,
  sendResponse,
  verifySIWEMessage,
} from 'shared';
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

export const login = async (req, res) => {
  const { address } = req.body;

  let account = await AccountSchema.findOne({ ethereumAddress: address });

  if (!account) {
    account = await AccountSchema.create({ ethereumAddress: address });
  }

  req.session.account = account;

  sendResponse(res, 200, 'success');
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw new err();
    sendResponse(res, 200, 'success');
  });
};

export const getSession = async (req, res) => {
  sendResponse(res, 200, 'success', req.session.account);
};
