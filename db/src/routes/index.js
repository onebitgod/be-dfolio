import { Router } from 'express';
import { requestLogin, verifyLogin } from '../controllers/index.js';
const router = Router();

router.post('/request', requestLogin);
router.post('/verify', verifyLogin);

export default router;
