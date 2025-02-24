import { Router } from 'express';
import { checkSession, sendResponse } from 'shared';

import cricketRoutes from './cricket.js';

const router = Router();

router.use('/cricket', checkSession, cricketRoutes);

export default router;
