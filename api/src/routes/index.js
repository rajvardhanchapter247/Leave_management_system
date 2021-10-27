import express from 'express';

import AuthRouter from './auth';
import LeaveRequestRouter from './leaveRequest';
import SettingRouter from './setting';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/leave-request', LeaveRequestRouter);
router.use('/setting', SettingRouter);

export default router;
