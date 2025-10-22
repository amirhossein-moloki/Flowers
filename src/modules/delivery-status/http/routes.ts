import { Router } from 'express';
import { DeliveryStatusController } from './controller';
import { Dependencies } from '@/infrastructure/di';

export const createDeliveryStatusRoutes = (dependencies: Dependencies): Router => {
  const router = Router();
  const controller = new DeliveryStatusController(
    dependencies.getDeliveryStatusUseCase,
    dependencies.listDeliveryStatusesUseCase,
  );

  router.get('/', (req, res) => controller.list(req, res));
  router.get('/:id', (req, res) => controller.findById(req, res));

  return router;
};
