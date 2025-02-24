import { Router } from 'express';
import { validate } from 'shared';
import validation from '../validations/cricket.js';
import controller from '../controllers/cricket.js';

const router = Router();

router.post('/', validate(validation.createQoute), controller.createQuote);

export default router;
