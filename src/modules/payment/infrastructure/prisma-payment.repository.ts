import { IPaymentRepository } from '@/modules/payment/domain/payment.repository';
import { Payment } from '@/modules/payment/domain/payment.entity';
import { PrismaClient } from '@prisma/client';
import { PaymentMapper } from '@/modules/payment/infrastructure/payment.mapper';

export class PrismaPaymentRepository implements IPaymentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Payment | null> {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    return payment ? PaymentMapper.toDomain(payment) : null;
  }

  async findByIdempotencyKey(key: string): Promise<Payment | null> {
    const payment = await this.prisma.payment.findUnique({ where: { idempotency_key: key } });
    return payment ? PaymentMapper.toDomain(payment) : null;
  }

  async findByOrderId(orderId: string): Promise<Payment | null> {
    const payment = await this.prisma.payment.findUnique({ where: { order_id: orderId } });
    return payment ? PaymentMapper.toDomain(payment) : null;
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany();
    return payments.map(PaymentMapper.toDomain);
  }

  async save(payment: Payment): Promise<void> {
    const data = PaymentMapper.toPersistence(payment);
    const { id, ...updateData } = data;
    await this.prisma.payment.upsert({
      where: { id: payment.id },
      update: updateData,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payment.delete({ where: { id } });
  }
}
