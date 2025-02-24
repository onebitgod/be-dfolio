import { Router } from 'express';
import { validate } from 'shared';
import matchRoutes from './cricket/match.js';
import tournamentRoutes from './cricket/tournament.js';
import teamRoutes from './cricket/team.js';

const router = Router();

router.use('/match', matchRoutes);
router.use('/team', teamRoutes);
router.use('/tournament', tournamentRoutes);

export default router;
