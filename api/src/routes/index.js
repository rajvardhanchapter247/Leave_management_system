import express from 'express';

import AuthRouter from './auth';
import LeaveRequestRouter from './leaveRequest';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/leave-request', LeaveRequestRouter);

export default router;
