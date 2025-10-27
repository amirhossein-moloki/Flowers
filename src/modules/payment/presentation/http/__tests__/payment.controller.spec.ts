import express from 'express';
import request from 'supertest';
import { mock } from 'jest-mock-extended';
import { Payment } from '@/modules/payment/domain/payment.entity';
import { success } from '@/core/utils/result';
import { CreatePaymentUseCase } from '@/modules/payment/application/use-cases/create-payment.usecase';
import { VerifyPaymentUseCase } from '@/modules/payment/application/use-cases/verify-payment.usecase';
import { PaymentMethod, PaymentStatus } from '@/core/domain/enums';
import { PaymentMapper } from '@/modules/payment/infrastructure/payment.mapper';

// Mock the use cases
const mockCreatePaymentUseCase = mock<CreatePaymentUseCase>();
const mockVerifyPaymentUseCase = mock<VerifyPaymentUseCase>();

// Mock the modules that instantiate the use cases and repositories
jest.mock('@/modules/payment/infrastructure/prisma-payment.repository');
jest.mock('@/modules/payment/application/use-cases/create-payment.usecase', () => ({
  CreatePaymentUseCase: jest.fn().mockImplementation(() => mockCreatePaymentUseCase),
}));
jest.mock('@/modules/payment/application/use-cases/verify-payment.usecase', () => ({
  VerifyPaymentUseCase: jest.fn().mockImplementation(() => mockVerifyPaymentUseCase),
}));

import paymentRoutes from '../payment.routes';

import { Request, Response, NextFunction } from 'express';

jest.mock('@/core/middlewares/auth.middleware', () => ({
  isAuthenticated: jest.fn((req: Request, res: Response, next: NextFunction) => next()),
  hasRole: jest.fn(() => (req: Request, res: Response, next: NextFunction) => next()),
}));

const app = express();
app.use(express.json());
app.use('/api/v1/payments', paymentRoutes);

describe('PaymentController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const paymentResult = Payment.create({
    order_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    amount: 100,
    method: PaymentMethod.ONLINE,
    status: PaymentStatus.PENDING,
    gateway: 'test-gateway',
    gateway_ref: 'test-ref',
    paid_at: new Date(),
  });

  if (!paymentResult.success) {
    throw paymentResult.error;
  }

  const payment = paymentResult.value;

  describe('POST /payments', () => {
    it('should create a payment and return 201', async () => {
      mockCreatePaymentUseCase.execute.mockResolvedValue(success(PaymentMapper.toDto(payment)));

      const response = await request(app)
        .post('/api/v1/payments')
        .send({
          orderId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
          amount: 100,
          method: 'online',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
  });

  describe('POST /payments/verify', () => {
    it('should verify a payment and return 200', async () => {
      mockVerifyPaymentUseCase.execute.mockResolvedValue(success(PaymentMapper.toDto(payment)));

      const response = await request(app)
        .post('/api/v1/payments/verify')
        .send({
          paymentId: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
          verificationCode: '123456',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });
  });
});
