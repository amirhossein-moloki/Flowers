import { Router } from 'express';
import { isAuthenticated } from '@/core/middlewares/auth.middleware';
import { PaymentController } from './payment.controller';
import { PrismaPaymentRepository } from '../../infrastructure/prisma-payment.repository';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.usecase';
import { VerifyPaymentUseCase } from '../../application/use-cases/verify-payment.usecase';
import prismaClient from '@/infrastructure/database/prisma/prisma-client';

const router = Router();

// Dependencies
const paymentRepository = new PrismaPaymentRepository(prismaClient);

// Use Cases
const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository);
const verifyPaymentUseCase = new VerifyPaymentUseCase(paymentRepository);

// Controller
const paymentController = new PaymentController(
  createPaymentUseCase,
  verifyPaymentUseCase,
);

router.use(isAuthenticated);
router.use('/', paymentController.router);

export default router;
