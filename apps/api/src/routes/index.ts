import { Router } from 'express';
import { healthRouter } from './health';
import { usersRouter } from './users';

export const router = Router();

router.use('/health', healthRouter);
router.use('/users', usersRouter);
