import { Router } from 'express';
import { VendorOutletController } from './controller';
import { VendorOutletDependencies } from '../vendor-outlet.dependencies';
import { validate } from '../../../infrastructure/http/middlewares/zod-validation.middleware';
import { createVendorOutletSchema } from './dto/create-vendor-outlet.schema';
import { updateVendorOutletSchema } from './dto/update-vendor-outlet.schema';
import { z } from 'zod';

export const createVendorOutletRoutes = (
  dependencies: VendorOutletDependencies,
) => {
  const router = Router();
  const controller = new VendorOutletController(dependencies);

  router.post(
    '/',
    validate(z.object({ body: createVendorOutletSchema })),
    controller.create.bind(controller),
  );
  router.get('/', controller.findAll.bind(controller));
  router.get('/:id', controller.findById.bind(controller));
  router.put(
    '/:id',
    validate(z.object({ body: updateVendorOutletSchema })),
    controller.update.bind(controller),
  );
  router.delete('/:id', controller.delete.bind(controller));

  return router;
};
