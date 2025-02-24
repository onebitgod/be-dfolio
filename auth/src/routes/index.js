import { Router } from 'express';
import * as controllers from '../controllers/index.js';
import * as validation from '../validations/index.js';
import { validate } from 'shared';
const router = Router();

router.post('/request', controllers.requestLogin);
router.post('/verify', controllers.verifyLogin);
router.post('/login', validate(validation.login), controllers.login);
router.post('/logout', controllers.logout);
router.get('/session', controllers.getSession);
// router.get('/wallet/:address', getWalletData);

export default router;
