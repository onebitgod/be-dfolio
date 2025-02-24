import Joi from 'joi';
import { getEnums, validators } from 'shared';
import { CricketMatchStatus } from 'shared/schemas/cricket/match.js';

export const createMatch = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().optional(),
  coverImage: Joi.string().uri().optional(),
  place: Joi.string().required(),
  type: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref('startDate')).required(),
  teams: Joi.array()
    .items(
      Joi.object({
        team: validators.objectId().required(),
        name: Joi.string().required(),
      }).required()
    )
    .min(2)
    .required(),
  status: Joi.string()
    .valid(...getEnums(CricketMatchStatus))
    .default(CricketMatchStatus.PENDING),
});
