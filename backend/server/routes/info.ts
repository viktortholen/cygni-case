import express from 'express';
import { info } from '../controllers/infoController';

const router = express.Router();

// Login
router.post('/info', info);

export default router;