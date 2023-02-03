import express from 'express';
import { todoControllers } from '../controllers/todoControllers.js';

const router = express.Router();

router.get('/', todoControllers.getAll);
router.get('/:id', todoControllers.getById);
router.post('/', todoControllers.add);
router.delete('/:id', todoControllers.delete);
router.put('/:id', todoControllers.update);

export default router;
