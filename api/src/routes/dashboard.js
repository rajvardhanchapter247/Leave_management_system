import express from 'express';
import { DashboardController } from '../controllers/apis';
import { verifyToken } from '../utils';

const router = express.Router();

router.get('/', verifyToken, DashboardController.userAndLeaveCount);

export default router;
