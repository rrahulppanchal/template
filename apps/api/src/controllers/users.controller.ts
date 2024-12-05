import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { isValidEmail } from '@repo/utils';
import { User, CreateUserDto, ApiResponse } from '../types';

const users = new Map<string, User>();

export const createUser = (
  req: Request<CreateUserDto>,
  res: Response<ApiResponse<User>>
) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Email and name are required',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid email format',
    });
  }

  const newUser: User = {
    id: uuidv4(),
    email,
    name,
    createdAt: new Date(),
  };

  users.set(newUser.id, newUser);

  return res.status(201).json({
    data: newUser,
  });
};

export const getUsers = (_: Request, res: Response<ApiResponse<User[]>>) => {
  return res.json({
    data: Array.from(users.values()),
  });
};
