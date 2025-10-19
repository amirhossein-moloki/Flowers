import { Router } from 'express';
import { ProductController } from './controller';
import { Dependencies } from '@/infrastructure/di';
import { validate } from '@/core/middlewares/validate.middleware';
import { CreateProductSchema } from './dto/create-product.schema';
import { UpdateProductSchema } from './dto/update-product.schema';

export const createProductRoutes = (dependencies: Dependencies): Router => {
  const router = Router();
  const controller = new ProductController(dependencies);

  router.post('/', validate(CreateProductSchema), controller.create.bind(controller));
  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById.bind(controller));
  router.put('/:id', validate(UpdateProductSchema), controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
};
