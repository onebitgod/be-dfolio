import { Router } from 'express';
import { validate } from 'shared';
import * as controller from '../../controllers/cricket/team.js';
import * as validation from '../../validations/cricket/team.js';

const router = Router();

router.post('/', validate(validation.createTeam), controller.createTeam);

export default router;
