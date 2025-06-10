import express, { Router } from 'express';
import healthRoutes from './healthRoutes';

const router: Router = express.Router();

router.use('/', healthRoutes);

export default router;
