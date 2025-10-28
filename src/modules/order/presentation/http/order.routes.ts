import { Router } from 'express';
import { OrderController } from './order.controller';

export function createOrderRoutes(orderController: OrderController): Router {
  const router = Router();
  router.use('/', orderController.router);
  return router;
}
