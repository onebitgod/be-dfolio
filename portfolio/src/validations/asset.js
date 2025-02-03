import joi from 'joi';
import { getEnums, validators } from 'shared';
import { AssetType } from 'shared/schemas/asset.js';

const addAsset = joi
  .object({
    type: joi.string().valid(getEnums(AssetType)).required(),
    token: validators.objectId(),
    nft: validators.objectId(),
  })
  .or('nft', 'token');

const validator = { addAsset };

export default validator;
