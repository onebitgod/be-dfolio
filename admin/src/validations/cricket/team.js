import Joi from 'joi';

export const createTeam = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().uri().optional(),
  coverImage: Joi.string().uri().optional(),
  flagImage: Joi.string().uri().optional(),
  country: Joi.string().required(),
});
