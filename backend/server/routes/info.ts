import express from 'express';
import { info } from '../controllers/infoController';

const router = express.Router();
router.get('/', info);

export default router;