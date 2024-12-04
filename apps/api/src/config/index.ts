import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: process.env.API_PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://your-production-domain.com']
        : ['http://localhost:5173', 'http://localhost:8000'],
  },
} as const;
