import express from 'express';
import { SettingController } from '../controllers/apis';
import { verifyToken } from '../utils';

const router = express.Router();

router.get('/', verifyToken, SettingController.settingView);
router.put('/:id', verifyToken, SettingController.updateSetting);

export default router;
