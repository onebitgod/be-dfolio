import joi from 'joi';
import { validators } from 'shared';

export const login = joi.object({
  address: validators.ethAddress().required(),
});
