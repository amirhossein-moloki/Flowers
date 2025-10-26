import { Router } from 'express';
import { UserController } from './controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createUserSchema } from './dto/create-user.schema';
import { updateUserSchema } from './dto/update-user.schema';
import { isAuthenticated } from '@/core/middlewares/auth.middleware';
import { Dependencies } from '@/infrastructure/di';

export const createUserRoutes = (dependencies: Dependencies): Router => {
  const router = Router();
  const userController = new UserController(dependencies);

  router.get('/', userController.findAll);
  router.get('/me', isAuthenticated, userController.me);
  router.get('/:id', userController.findById);
  router.post('/', validate(createUserSchema), userController.create);
  router.put('/:id', validate(updateUserSchema), userController.update);
  router.delete('/:id', userController.delete);

  return router;
};
