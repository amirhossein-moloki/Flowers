import { Router } from 'express';
import { validate } from '@/core/middlewares/validate.middleware';
import { DriverLocationController } from './controller';
import { createDriverLocationSchema } from './dto/create-driver-location.schema';
import { updateDriverLocationSchema } from './dto/update-driver-location.schema';
import { DIContainer } from '@/infrastructure/di';

export const driverLocationRoutes = (diContainer: DIContainer): Router => {
  const router = Router();
  const controller = new DriverLocationController(diContainer);

  router.post('/', validate(createDriverLocationSchema), controller.create);
  router.get('/:id', controller.getById);
  router.put('/:id', validate(updateDriverLocationSchema), controller.update);
  router.delete('/:id', controller.delete);

  return router;
};
