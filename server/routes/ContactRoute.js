import express from 'express';
import ContactController from '../controllers/ContactController.js';

const router = express.Router();

router.post('/create', ContactController.create);
router.get('/', ContactController.getAll);
router.delete('/:id', ContactController.delete);

export default router;