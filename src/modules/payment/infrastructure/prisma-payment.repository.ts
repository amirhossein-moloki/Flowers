import { IPaymentRepository } from '@/modules/payment/domain/payment.repository';
import { Payment } from '@/modules/payment/domain/payment.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { PaymentMapper } from '@/modules/payment/infrastructure/payment.mapper';

export class PrismaPaymentRepository implements IPaymentRepository {
  async findById(id: string): Promise<Payment | null> {
    const payment = await prisma.payment.findUnique({ where: { id } });
    return payment ? PaymentMapper.toDomain(payment) : null;
  }

  async findByIdempotencyKey(key: string): Promise<Payment | null> {
    const payment = await prisma.payment.findUnique({ where: { idempotency_key: key } });
    return payment ? PaymentMapper.toDomain(payment) : null;
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    const payment = await prisma.payment.findUnique({ where: { order_id: orderId } });
    return payment ? PaymentMapper.toDomain(payment) : null;
  }

  async findAll(): Promise<Payment[]> {
    const payments = await prisma.payment.findMany();
    return payments.map(PaymentMapper.toDomain);
  }

  async save(payment: Payment): Promise<void> {
    const data = PaymentMapper.toPersistence(payment);
    const { id, ...updateData } = data;
    await prisma.payment.upsert({
      where: { id: payment.id },
      update: updateData,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.payment.delete({ where: { id } });
  }
}