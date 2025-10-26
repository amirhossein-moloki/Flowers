import { Router } from 'express';
import { VendorOutletController } from './controller';
import { VendorOutletDependencies } from '../vendor-outlet.dependencies';
import { validate } from '../../../infrastructure/http/middlewares/zod-validation.middleware';
import { createVendorOutletSchema } from './dto/create-vendor-outlet.schema';
import { updateVendorOutletSchema } from './dto/update-vendor-outlet.schema';
import { z } from 'zod';
import { isAuthenticated } from '@/core/middlewares/auth.middleware';
import { hasRole } from '@/core/middlewares/auth.middleware';
import { UserRole } from '@/core/domain/enums';

export const createVendorOutletRoutes = (
  dependencies: VendorOutletDependencies,
) => {
  const router = Router();
  const controller = new VendorOutletController(dependencies);

  router.post(
    '/',
    isAuthenticated,
    hasRole([UserRole.ADMIN]),
    validate(z.object({ body: createVendorOutletSchema })),
    controller.create.bind(controller),
  );
  router.get('/', isAuthenticated, controller.findAll.bind(controller));
  router.get('/:id', isAuthenticated, controller.findById.bind(controller));
  router.put(
    '/:id',
    isAuthenticated,
    hasRole([UserRole.ADMIN]),
    validate(z.object({ body: updateVendorOutletSchema })),
    controller.update.bind(controller),
  );
  router.delete('/:id', isAuthenticated, hasRole([UserRole.ADMIN]), controller.delete.bind(controller));

  return router;
};
