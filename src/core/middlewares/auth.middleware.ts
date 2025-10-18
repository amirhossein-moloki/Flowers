import { Request, Response, NextFunction } from 'express';

// In a real app, this would verify a JWT. For now, it's a placeholder.
// The test environment will mock this function.
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};