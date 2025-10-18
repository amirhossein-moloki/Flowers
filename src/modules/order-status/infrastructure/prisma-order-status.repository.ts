import { IOrderStatusRepository } from '../domain/order-status.repository';
import { OrderStatus } from '../domain/order-status.entity';
import prisma from '../../../infrastructure/database/prisma/prisma-client';
import { OrderStatusMapper } from './order-status.mapper';

export class PrismaOrderStatusRepository implements IOrderStatusRepository {
  async findById(id: string): Promise<OrderStatus | null> {
    const orderStatus = await prisma.orderStatus.findUnique({ where: { id } });
    return orderStatus ? OrderStatusMapper.toDomain(orderStatus) : null;
  }

  async findAll(): Promise<OrderStatus[]> {
    const orderStatuses = await prisma.orderStatus.findMany();
    return orderStatuses.map(OrderStatusMapper.toDomain);
  }

  async save(orderStatus: OrderStatus): Promise<void> {
    const data = OrderStatusMapper.toPersistence(orderStatus);
    await prisma.orderStatus.upsert({
      where: { id: orderStatus.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.orderStatus.delete({ where: { id } });
  }
}