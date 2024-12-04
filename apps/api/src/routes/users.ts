import { Router } from 'express';
import { createUserHandler, getUsersHandler } from '../controllers/users';
import { validateRequest } from '../middleware';
import { createUserSchema } from '../controllers/users';

export const usersRouter = Router();

usersRouter.post('/', validateRequest(createUserSchema), createUserHandler);
usersRouter.get('/', getUsersHandler);
