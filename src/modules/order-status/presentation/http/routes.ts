import { Router } from 'express';
import { OrderStatusController } from './controller';
import { GetAllOrderStatusesUseCase } from '../../application/use-cases/get-all-order-statuses.usecase';
import { GetOrderStatusUseCase } from '../../application/use-cases/get-order-status.usecase';
import { Dependencies } from '@/infrastructure/di';

export const createOrderStatusRoutes = (dependencies: Dependencies): Router => {
  const router = Router();
  const controller = new OrderStatusController(
    dependencies.getAllOrderStatusesUseCase,
    dependencies.getOrderStatusUseCase,
  );

  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById.bind(controller));

  return router;
}
