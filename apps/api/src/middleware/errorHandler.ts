import { ErrorRequestHandler } from 'express';
import { ApiResponse } from '../types';

export const errorHandler: ErrorRequestHandler = (err, _, res) => {
  console.error(err.stack);

  const response: ApiResponse<never> = {
    error: 'Internal Server Error',
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'An unexpected error occurred',
  };

  res.status(500).json(response);
};
