import { Request, Response } from 'express';
import { ApiResponse, User } from '../../types';
import { createUser, getAllUsers } from './users.service';
import { CreateUserRequest } from './users.schema';

export const createUserHandler = (
  req: Request<CreateUserRequest['body']>,
  res: Response<ApiResponse<User>>
) => {
  try {
    const user = createUser(req.body);
    return res.status(201).json({ data: user });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: String(error),
    });
  }
};

export const getUsersHandler = (
  _: Request,
  res: Response<ApiResponse<User[]>>
) => {
  try {
    const users = getAllUsers();
    return res.json({ data: users });
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: String(error),
    });
  }
};
