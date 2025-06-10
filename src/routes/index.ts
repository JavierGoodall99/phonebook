import express, { Router } from 'express';
import healthRoutes from './healthRoutes';
import contactRoutes from './contactRoutes';

const router: Router = express.Router();

router.use('/', healthRoutes);
router.use('/contacts', contactRoutes);

export default router;
