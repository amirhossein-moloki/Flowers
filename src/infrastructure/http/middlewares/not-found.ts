import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Not Found - ${req.method} ${req.originalUrl}`,
  });
};