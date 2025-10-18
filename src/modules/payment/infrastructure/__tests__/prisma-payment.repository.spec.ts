import { PrismaPaymentRepository } from '../prisma-payment.repository';
import { Payment } from '../../domain/payment.entity';
import { prismaMock } from '../../../__tests__/helpers/prisma-mock.helper';
import { Payment as PrismaPayment, PaymentMethod, PaymentStatus } from '@prisma/client';

jest.mock('../../../../infrastructure/database/prisma/prisma-client');

import { PaymentMethod as DomainPaymentMethod, PaymentStatus as DomainPaymentStatus } from '../../../../core/domain/enums';

describe('PrismaPaymentRepository', () => {
  let repository: PrismaPaymentRepository;

  const paymentProps = {
    order_id: 'order-uuid',
    method: DomainPaymentMethod.CREDIT_CARD,
    status: DomainPaymentStatus.COMPLETED,
    gateway: 'stripe',
    gateway_ref: 'txn_123',
    amount: 100,
    paid_at: new Date(),
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
    repository = new PrismaPaymentRepository();
  });

  describe('save', () => {
    it('should call prisma.payment.upsert with correct data', async () => {
      await repository.save(paymentEntity!);

      const { id, ...updateData } = paymentEntity!.props;
      expect(prismaMock.payment.upsert).toHaveBeenCalledWith({
        where: { id: paymentEntity!.id },
        create: {
          id: paymentEntity!.id,
          ...paymentProps,
        },
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