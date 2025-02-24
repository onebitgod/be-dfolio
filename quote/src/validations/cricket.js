import joi from 'joi';
import { getEnums, validators } from 'shared';
import { QuoteCommissionType } from 'shared/schemas/quote/quote.js';

const createQoute = joi.object({
  minimumPoints: joi.number().required(),
  commission: joi
    .object({
      type: joi.string().valid(...getEnums(QuoteCommissionType)),
      value: joi.number().required(),
    })
    .required(),
  commission: joi
    .object({
      type: joi.number().required(),
      over: joi.number().required(),
      ball: joi.number().required(),
      run: joi.number().required(),
      boundary: joi.number().required(),
    })
    .required(),
  tournament: validators.objectId().required(),
  match: validators.objectId().required(),
  team: validators.objectId().required(),
});

const validator = { createQoute };

export default validator;
