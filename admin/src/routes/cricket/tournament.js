import { Router } from 'express';
import { validate } from 'shared';
import * as controller from '../../controllers/cricket/tournament.js';
import * as validation from '../../validations/cricket/tournament.js';

const router = Router();

router.post(
  '/',
  validate(validation.createTournament),
  controller.createTournament
);

export default router;
