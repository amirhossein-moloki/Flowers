import { Router } from 'express';
import { ProductController } from './controller';
import { Dependencies } from '@/infrastructure/di';
import { validate } from '@/core/middlewares/validate.middleware';
import { CreateProductSchema } from './dto/create-product.schema';
import { UpdateProductSchema } from './dto/update-product.schema';
import { isAuthenticated, hasRole } from '@/core/middlewares/auth.middleware';
import { UserRole } from '@prisma/client';

export const createProductRoutes = (dependencies: Dependencies): Router => {
  const router = Router();
  const controller = new ProductController(dependencies);

  router.use(isAuthenticated);

  router.post(
    '/',
    hasRole([UserRole.ADMIN]),
    validate(CreateProductSchema),
    controller.create.bind(controller),
  );
  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById.bind(controller));
  router.put(
    '/:id',
    hasRole([UserRole.ADMIN]),
    validate(UpdateProductSchema),
    controller.update.bind(controller),
  );
  router.delete('/:id', hasRole([UserRole.ADMIN]), controller.delete.bind(controller));

  return router;
};
