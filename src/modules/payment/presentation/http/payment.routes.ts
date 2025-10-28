import { Router } from 'express';
import { isAuthenticated } from '@/core/middlewares/auth.middleware';
import { PaymentController } from './payment.controller';

export function createPaymentRoutes(paymentController: PaymentController): Router {
  const router = Router();
  router.use(isAuthenticated);
  router.use('/', paymentController.router);
  return router;
}
