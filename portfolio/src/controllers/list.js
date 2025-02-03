import { sendResponse } from 'shared';
import ChainSchema from 'shared/schemas/chain.js';
import TokenSchema from 'shared/schemas/token.js';

export const getChainList = async (req, res) => {
  const chains = await ChainSchema.find();
  sendResponse(res, 200, 'success', chain);
};

export const getTokenList = async (req, res) => {
  const filter = req.query;
  const tokens = await TokenSchema.find(filter);
  sendResponse(res, 200, 'success', tokens);
};
