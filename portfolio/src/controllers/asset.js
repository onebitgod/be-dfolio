import { sendResponse } from 'shared';
import AssetSchema from 'shared/schemas/asset.js';
import TokenSchema from 'shared/schemas/token.js';

const getAssets = async (req, res) => {
  const assets = await AssetSchema.find({ account: req.account._id });
  sendResponse(res, 200, 'success', assets);
};

const addAsset = async (req, res) => {
  sendResponse(res, 200, 'success', assets);
};

const controller = { getAssets, addAsset };

export default controller;
