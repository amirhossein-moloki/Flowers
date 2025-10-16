import { Router } from 'express';
import { OrderController } from './order.controller';
import { PrismaOrderRepository } from '../../infrastructure/prisma-order.repository';
import { CreateOrderUseCase } from '../../application/use-cases/create-order.usecase';
import { PrismaUserRepository } from '../../../user/infrastructure/prisma-user.repository';

const router = Router();

// Dependencies
const orderRepository = new PrismaOrderRepository();
const userRepository = new PrismaUserRepository(); // Cross-module dependency
const createOrderUseCase = new CreateOrderUseCase(
  orderRepository,
  userRepository,
);
const orderController = new OrderController(createOrderUseCase);

router.use('/orders', orderController.router);

export default router;