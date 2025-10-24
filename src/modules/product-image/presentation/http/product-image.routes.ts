import { Router } from 'express';
import { ProductImageController } from './product-image.controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { CreateProductImageSchema } from './dto/create-product-image.schema';
import { UpdateProductImageSchema } from './dto/update-product-image.schema';
import { Dependencies } from '@/infrastructure/di';

export const createProductImageRoutes = (dependencies: Dependencies) => {
  const router = Router();
  const controller = new ProductImageController(
    dependencies.createProductImageUseCase,
    dependencies.deleteProductImageUseCase,
    dependencies.getProductImageUseCase,
    dependencies.updateProductImageUseCase,
    dependencies.findAllProductImageUseCase,
  );

  router.post(
    '/',
    validate(CreateProductImageSchema),
    controller.create.bind(controller),
  );
  router.delete('/:id', controller.delete.bind(controller));
  router.get('/:id', controller.findById.bind(controller));
  router.get('/', controller.findAll.bind(controller));
  router.put(
    '/:id',
    validate(UpdateProductImageSchema),
    controller.update.bind(controller),
  );

  return router;
};
