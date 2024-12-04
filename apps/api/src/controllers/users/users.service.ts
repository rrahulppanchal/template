import { v4 as uuidv4 } from 'uuid';
import { User, CreateUserDto } from '../../types';

const users = new Map<string, User>();

export const createUser = (data: CreateUserDto): User => {
  const newUser: User = {
    id: uuidv4(),
    ...data,
    createdAt: new Date(),
  };

  users.set(newUser.id, newUser);
  return newUser;
};

export const getAllUsers = (): User[] => {
  return Array.from(users.values());
};
