import { Router } from 'express';
import controller from '../controllers/asset.js';
import validator from '../validations/asset.js';
import { validate } from 'shared';

const router = Router();

router.get('/', controller.getAssets);
router.post('/', validate(validator.addAsset), controller.addAsset);

export default router;
