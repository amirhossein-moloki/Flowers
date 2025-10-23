import { Router } from 'express';
import { DeliveryController } from './controller';
import { Dependencies } from '@/infrastructure/di';

export const createDeliveryRoutes = (dependencies: Dependencies): Router => {
  const router = Router();
  const controller = new DeliveryController(
    dependencies.createDeliveryUseCase,
    dependencies.getDeliveryUseCase,
    dependencies.updateDeliveryUseCase,
    dependencies.deleteDeliveryUseCase,
    dependencies.listDeliveriesUseCase,
  );

  router.post('/', (req, res) => controller.create(req, res));
  router.get('/', (req, res) => controller.list(req, res));
  router.get('/:id', (req, res) => controller.findById(req, res));
  router.put('/:id', (req, res) => controller.update(req, res));
  router.delete('/:id', (req, res) => controller.delete(req, res));
  router.post('/:id/assign-driver', (req, res) => {
    res.status(200).json({ message: `Driver assigned to delivery ${req.params.id}` });
  });

  return router;
};
