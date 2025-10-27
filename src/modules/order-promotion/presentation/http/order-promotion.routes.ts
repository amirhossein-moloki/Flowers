import { Router } from 'express';
import { OrderPromotionController } from './order-promotion.controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createOrderPromotionSchema } from './dto/create-order-promotion.schema';
import { updateOrderPromotionSchema } from './dto/update-order-promotion.schema';
import { isAuthenticated, hasRole } from '@/core/middlewares/auth.middleware';
import { UserRole } from '@prisma/client';
import { CreateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/create-order-promotion.usecase';
import { GetOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/get-order-promotion.usecase';
import { UpdateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/update-order-promotion.usecase';
import { DeleteOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/delete-order-promotion.usecase';
import { PrismaOrderPromotionRepository } from '@/modules/order-promotion/infrastructure/prisma-order-promotion.repository';
import { PrismaClient } from '@prisma/client';

export const createOrderPromotionRoutes = (
  orderPromotionRepository: PrismaOrderPromotionRepository,
): Router => {
  const router = Router();

  const createOrderPromotionUseCase = new CreateOrderPromotionUseCase(orderPromotionRepository);
  const getOrderPromotionUseCase = new GetOrderPromotionUseCase(orderPromotionRepository);
  const updateOrderPromotionUseCase = new UpdateOrderPromotionUseCase(orderPromotionRepository);
  const deleteOrderPromotionUseCase = new DeleteOrderPromotionUseCase(orderPromotionRepository);

  const orderPromotionController = new OrderPromotionController(
    createOrderPromotionUseCase,
    getOrderPromotionUseCase,
    updateOrderPromotionUseCase,
    deleteOrderPromotionUseCase,
  );

  router.use(isAuthenticated);

  router.post(
    '/',
    hasRole([UserRole.ADMIN]),
    validate(createOrderPromotionSchema),
    orderPromotionController.create.bind(orderPromotionController),
  );
  router.get('/:id', orderPromotionController.findById.bind(orderPromotionController));
  router.put(
    '/:id',
    hasRole([UserRole.ADMIN]),
    validate(updateOrderPromotionSchema),
    orderPromotionController.update.bind(orderPromotionController),
  );
  router.delete(
    '/:id',
    hasRole([UserRole.ADMIN]),
    orderPromotionController.delete.bind(orderPromotionController),
  );

  return router;
};
