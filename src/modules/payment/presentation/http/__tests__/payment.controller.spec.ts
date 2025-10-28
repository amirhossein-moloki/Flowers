import express from 'express';
import request from 'supertest';
import { mock } from 'jest-mock-extended';
import { Payment } from '@/modules/payment/domain/payment.entity';
import { success } from '@/core/utils/result';
import { CreatePaymentUseCase } from '@/modules/payment/application/use-cases/create-payment.usecase';
import { VerifyPaymentUseCase } from '@/modules/payment/application/use-cases/verify-payment.usecase';
import { PaymentController } from '../payment.controller';
import { createPaymentRoutes } from '../payment.routes';
import { PaymentMethod, PaymentStatus } from '@prisma/client';
import { randomUUID } from 'crypto';

// Mock the auth middleware
jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: (req, res, next) => next(),
}));

// Mock the validate middleware
jest.mock('@/core/middlewares/validate.middleware', () => ({
  validate: () => (req, res, next) => next(),
}));

jest.mock('@prisma/client', () => {
    const originalModule = jest.requireActual('@prisma/client');
    return {
        ...originalModule,
        PaymentMethod: {
            CREDIT_CARD: 'CREDIT_CARD',
        },
        PaymentStatus: {
            PENDING: 'PENDING',
        },
    };
});

// Mock the use cases
const mockCreatePaymentUseCase = mock<CreatePaymentUseCase>();
const mockVerifyPaymentUseCase = mock<VerifyPaymentUseCase>();

// Instantiate the controller with the mocked use cases
const paymentController = new PaymentController(
  mockCreatePaymentUseCase,
  mockVerifyPaymentUseCase,
);

// Create the router using the factory function
const paymentRoutes = createPaymentRoutes(paymentController);

const app = express();
app.use(express.json());
app.use('/api/v1/payments', paymentRoutes);

describe('PaymentController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const paymentResult = Payment.create({
    order_id: randomUUID(),
    method: PaymentMethod.CREDIT_CARD,
    status: PaymentStatus.PENDING,
    gateway: 'stripe',
    gateway_ref: 'pi_123456789',
    amount: 100,
  });

  if (!paymentResult.success) {
    throw paymentResult.error;
  }

  const payment = paymentResult.value;

  describe('POST /api/v1/payments', () => {
    it('should return a payment and 201', async () => {
      mockCreatePaymentUseCase.execute.mockResolvedValue(success(payment));

      const response = await request(app).post('/api/v1/payments').send({
        order_id: payment.order_id,
        method: payment.method,
        amount: payment.amount,
      });

      expect(response.status).toBe(201);
      expect(response.body.order_id).toBe(payment.order_id);
    });
  });

  describe('POST /api/v1/payments/verify', () => {
    it('should return a payment and 200', async () => {
      mockVerifyPaymentUseCase.execute.mockResolvedValue(success(payment));

      const response = await request(app)
        .post('/api/v1/payments/verify')
        .send({
          payment_id: payment.id,
          gateway_ref: payment.gateway_ref,
        });

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(payment.id);
    });
  });
});
