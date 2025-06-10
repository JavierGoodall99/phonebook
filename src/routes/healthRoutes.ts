import express, { Router } from 'express';
import healthController from '../controllers/healthController';

const router: Router = express.Router();

router.get('/', healthController.healthCheck);

export default router;
