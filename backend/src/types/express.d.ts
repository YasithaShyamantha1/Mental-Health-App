import { Request } from 'express';

declare module 'express' {
  interface Request {
    user?: {
      userId: number;
    };
  }
} 