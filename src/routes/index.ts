import { Router } from 'express';
import {AuthRoute} from './authRoutes';
import { RideRoute } from './rideRoutes';

const router = Router();
router.use('/auth',  AuthRoute);
router.use('/rides',  RideRoute );
export default router;