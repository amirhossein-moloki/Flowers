import { Router } from 'express';
import { OrderPromotionController } from './order-promotion.controller';
import { validate } from '@/core/middlewares/validate.middleware';
import { createOrderPromotionSchema } from './dto/create-order-promotion.schema';
import { updateOrderPromotionSchema } from './dto/update-order-promotion.schema';
import { CreateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/create-order-promotion.usecase';
import { GetOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/get-order-promotion.usecase';
import { UpdateOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/update-order-promotion.usecase';
import { DeleteOrderPromotionUseCase } from '@/modules/order-promotion/application/use-cases/delete-order-promotion.usecase';
import { PrismaOrderPromotionRepository } from '@/modules/order-promotion/infrastructure/prisma-order-promotion.repository';
import { prisma } from '@/infrastructure/database/prisma/prisma-client';

export const orderPromotionRouter = Router();

const orderPromotionRepository = new PrismaOrderPromotionRepository(prisma);

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

orderPromotionRouter.post(
  '/',
  validate(createOrderPromotionSchema),
  orderPromotionController.create.bind(orderPromotionController),
);
orderPromotionRouter.get('/:id', orderPromotionController.findById.bind(orderPromotionController));
orderPromotionRouter.put(
  '/:id',
  validate(updateOrderPromotionSchema),
  orderPromotionController.update.bind(orderPromotionController),
);
orderPromotionRouter.delete('/:id', orderPromotionController.delete.bind(orderPromotionController));
