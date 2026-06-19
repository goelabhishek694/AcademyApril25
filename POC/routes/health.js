import express from 'express';
const router = express.Router();

import { handleHealthCheck, handleCPUCheck } from '../controllers/health.js';
import {m1, m2, m3, logger} from '../middlewares/cpuMiddleware.js';

router.get('/', handleHealthCheck);

router.get("/cpu", m1, m2, m3, logger, handleCPUCheck)

export default router;