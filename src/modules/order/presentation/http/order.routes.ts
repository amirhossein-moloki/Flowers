import { Router } from 'express';
import { OrderController } from './order.controller';
import { PrismaOrderRepository } from '@/modules/order/infrastructure/prisma-order.repository';
import { CreateOrderUseCase } from '@/modules/order/application/use-cases/create-order.usecase';
import { GetOrderUseCase } from '@/modules/order/application/use-cases/get-order.usecase';
import { FindAllOrdersUseCase } from '@/modules/order/application/use-cases/find-all-orders.usecase';
import { UpdateOrderUseCase } from '@/modules/order/application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@/modules/order/application/use-cases/delete-order.usecase';
import { ConfirmOrderUseCase } from '@/modules/order/application/use-cases/confirm-order.usecase';
import { CancelOrderUseCase } from '@/modules/order/application/use-cases/cancel-order.usecase';

const router = Router();

// Dependencies
const orderRepository = new PrismaOrderRepository();

// Use Cases
const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getOrderUseCase = new GetOrderUseCase(orderRepository);
const findAllOrdersUseCase = new FindAllOrdersUseCase(orderRepository);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
const confirmOrderUseCase = new ConfirmOrderUseCase(orderRepository);
const cancelOrderUseCase = new CancelOrderUseCase(orderRepository);

// Controller
const orderController = new OrderController(
  createOrderUseCase,
  getOrderUseCase,
  findAllOrdersUseCase,
  updateOrderUseCase,
  deleteOrderUseCase,
  confirmOrderUseCase,
  cancelOrderUseCase,
);

router.use('/', orderController.router);

export default router;
