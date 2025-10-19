import { Router } from 'express';
import { OrderStatusController } from './controller';
import { PrismaOrderStatusRepository } from '../../infrastructure/prisma-order-status.repository';
import { GetAllOrderStatusesUseCase } from '../../application/use-cases/get-all-order-statuses.usecase';
import { GetOrderStatusUseCase } from '../../application/use-cases/get-order-status.usecase';
import { prismaClient } from '@/infrastructure/database/prisma/prisma-client';

const router = Router();

// Dependencies
const orderStatusRepository = new PrismaOrderStatusRepository(prismaClient);
const getAllOrderStatusesUseCase = new GetAllOrderStatusesUseCase(orderStatusRepository);
const getOrderStatusUseCase = new GetOrderStatusUseCase(orderStatusRepository);
const orderStatusController = new OrderStatusController(getAllOrderStatusesUseCase, getOrderStatusUseCase);

// Routes
router.get('/', orderStatusController.getAll);
router.get('/:id', orderStatusController.getById);

export default router;
