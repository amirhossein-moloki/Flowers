import { PrismaPaymentRepository } from '../prisma-payment.repository';
import { Payment } from '../../domain/payment.entity';
import { prismaMock } from '../../../__tests__/helpers/prisma-mock.helper';
import { Payment as PrismaPayment, PaymentMethod, PaymentStatus } from '@prisma/client';
import { PaymentMapper } from '../payment.mapper';

jest.mock('../../../../infrastructure/database/prisma/prisma-client');

describe('PrismaPaymentRepository', () => {
  let repository: PrismaPaymentRepository;

  const paymentProps = {
    order_id: 'order-uuid',
    method: PaymentMethod.ONLINE,
    status: PaymentStatus.PAID,
    gateway: 'stripe',
    gateway_ref: 'txn_123',
    amount: 100,
    paid_at: new Date(),
    idempotency_key: 'idempotency-key',
  };
  const paymentEntityResult = Payment.create(paymentProps, 'payment-uuid');
  const paymentEntity = paymentEntityResult.success ? paymentEntityResult.value : null;

  const prismaPayment: PrismaPayment = {
    id: paymentEntity!.id,
    ...paymentProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(() => {
    repository = new PrismaPaymentRepository(prismaMock);
  });

  describe('save', () => {
    it('should call prisma.payment.upsert with correct data', async () => {
      await repository.save(paymentEntity!);

      const persistenceData = PaymentMapper.toPersistence(paymentEntity!);
      const { id, ...updateData } = persistenceData;
      expect(prismaMock.payment.upsert).toHaveBeenCalledWith({
        where: { id: paymentEntity!.id },
        create: persistenceData,
        update: updateData,
      });
    });
  });

  describe('findById', () => {
    it('should return a payment entity if found', async () => {
      prismaMock.payment.findUnique.mockResolvedValue(prismaPayment);

      const result = await repository.findById('payment-uuid');

      expect(result).toBeInstanceOf(Payment);
      expect(result!.id).toBe(prismaPayment.id);
    });

    it('should return null if payment not found', async () => {
      prismaMock.payment.findUnique.mockResolvedValue(null);

      const result = await repository.findById('non-existent-uuid');

      expect(result).toBeNull();
    });
  });
});