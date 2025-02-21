import { Router } from 'express';
import {AuthRoute} from './authRoutes';

const router = Router();
router.use('/auth',  AuthRoute);
export default router;