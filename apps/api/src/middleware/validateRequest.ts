import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { ApiResponse } from '../types';

interface T {}

export const validateRequest = (schema: AnyZodObject) => {
  return async (
    req: Request,
    res: Response<ApiResponse<T>>,
    next: NextFunction
  ) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json({
        error: 'Validation Error',
        message: String(error) || 'Invalid request data',
      });
    }
  };
};
