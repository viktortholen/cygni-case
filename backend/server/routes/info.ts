import express from 'express';
import { info } from '../controllers/infoController';

const router = express.Router();

// Login
router.get('/', info);

export default router;