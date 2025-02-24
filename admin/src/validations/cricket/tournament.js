import Joi from 'joi';
import { validators } from 'shared';

export const createTournament = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().optional(),
  coverImage: Joi.string().uri().optional(),
  place: Joi.string().required(),
  type: Joi.string().required(),
  startDate: validators.date().required(),
  endDate: validators.date().required(),
  teams: Joi.array()
    .items(
      Joi.object({
        team: validators.objectId().required(),
        name: Joi.string().required(),
      }).required()
    )
    .required(),
}).options({ abortEarly: false });
