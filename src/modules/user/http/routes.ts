import { Router } from 'express';
import { UserController } from '../presentation/http/user.controller';

export const createUserRoutes = (userController: UserController): Router => {
  return userController.router;
};
