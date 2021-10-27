import express from 'express';
import { LeaveRequestController } from '../controllers/apis';
import { verifyToken } from '../utils';
import { AddLeaveRequestValidation, updateLeaveStatus } from '../validations';
const router = express.Router();

import { AddLeaveRequestValidation, UpdateLeaveStatus } from '../validations';
router.post(
  '/add',
  verifyToken,
  AddLeaveRequestValidation,
  LeaveRequestController.addLeaveRequest
);
router.get('/list', verifyToken, LeaveRequestController.leaveRequestList);
router.get('/me', verifyToken, LeaveRequestController.myLeaveRequest);
router.get('/view/:id', verifyToken, LeaveRequestController.leaveRequestView);
router.get(
  '/by-user/:id',
  verifyToken,
  LeaveRequestController.leaveRequestByUser
);
router.patch(
  '/update-status/:id',
  verifyToken,
  UpdateLeaveStatus,
  LeaveRequestController.updateLeaveStatus
);

export default router;
