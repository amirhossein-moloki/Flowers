import { Router } from 'express';
import { PaymentController } from './payment.controller';
import { PrismaPaymentRepository } from '../../infrastructure/prisma-payment.repository';
import { CreatePaymentUseCase } from '../../application/use-cases/create-payment.usecase';
import { VerifyPaymentUseCase } from '../../application/use-cases/verify-payment.usecase';

const router = Router();

// Dependencies
const paymentRepository = new PrismaPaymentRepository();

// Use Cases
const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository);
const verifyPaymentUseCase = new VerifyPaymentUseCase(paymentRepository);

// Controller
const paymentController = new PaymentController(
  createPaymentUseCase,
  verifyPaymentUseCase,
);

export default paymentController.router;
