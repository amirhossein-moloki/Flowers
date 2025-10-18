import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaPaymentRepository } from '@/modules/payment/infrastructure/prisma-payment.repository';
import { Payment } from '@/modules/payment/domain/payment.entity';
import { PaymentMapper } from '@/modules/payment/infrastructure/payment.mapper';
import { PaymentMethod, PaymentStatus } from '@/core/domain/enums';

describe('PrismaPaymentRepository', () => {
  let repository: PrismaPaymentRepository;

  beforeEach(() => {
    repository = new PrismaPaymentRepository();
  });

  const paymentProps = {
    order_id: 'order-123',
    method: PaymentMethod.CREDIT_CARD,
    status: PaymentStatus.COMPLETED,
    gateway: 'test-gateway',
    gateway_ref: 'ref-789',
    amount: 100,
    paid_at: new Date(),
  };
  const paymentResult = Payment.create(paymentProps, 'payment-id-1');
  if (!paymentResult.success) {
    throw new Error('Test setup failed: could not create payment entity');
  }
  const paymentEntity = paymentResult.value;

  const prismaPayment = {
    id: paymentEntity.id,
    ...paymentProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  test('findById should return a payment entity when found', async () => {
    prismaMock.payment.findUnique.mockResolvedValue(prismaPayment);

    const foundPayment = await repository.findById('payment-id-1');

    expect(foundPayment).toBeInstanceOf(Payment);
    expect(foundPayment?.id).toBe('payment-id-1');
    expect(prismaMock.payment.findUnique).toHaveBeenCalledWith({ where: { id: 'payment-id-1' } });
  });

  test('findByOrderId should return a payment entity when found', async () => {
    prismaMock.payment.findUnique.mockResolvedValue(prismaPayment);

    const foundPayment = await repository.findByOrderId('order-123');

    expect(foundPayment).toBeInstanceOf(Payment);
    expect(foundPayment?.props.order_id).toBe('order-123');
    expect(prismaMock.payment.findUnique).toHaveBeenCalledWith({ where: { order_id: 'order-123' } });
  });

  test('save should call upsert on prisma client', async () => {
    const { id, ...updateData } = PaymentMapper.toPersistence(paymentEntity);
    await repository.save(paymentEntity);

    expect(prismaMock.payment.upsert).toHaveBeenCalledWith({
      where: { id: paymentEntity.id },
      create: PaymentMapper.toPersistence(paymentEntity),
      update: updateData,
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('payment-id-1');

    expect(prismaMock.payment.delete).toHaveBeenCalledWith({
      where: { id: 'payment-id-1' },
    });
  });
});