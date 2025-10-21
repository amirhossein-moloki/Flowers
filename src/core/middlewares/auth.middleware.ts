import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // In a real app, this would be a real authentication check (e.g., JWT verification)
  // For the purpose of this test, we'll rely on a mock user being set in the test environment.
  // @ts-ignore
  if (req.user) {
    return next();
  }
  return res.status(401).json({ message: 'Unauthorized' });
};

export const hasRole = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
