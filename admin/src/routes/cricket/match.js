import { Router } from 'express';
import { validate } from 'shared';
import * as controller from '../../controllers/cricket/match.js';
import * as validation from '../../validations/cricket/match.js';

const router = Router();

router.post('/', validate(validation.createMatch), controller.createMatch);

export default router;
