import { IOrderStatusRepository } from '../domain/order-status.repository';
import { OrderStatus } from '../domain/order-status.entity';
import { PrismaClient } from '@prisma/client';
import { OrderStatusMapper } from './order-status.mapper';
import { Result, success } from '@/core/utils/result';

export class PrismaOrderStatusRepository implements IOrderStatusRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Result<OrderStatus | null, Error>> {
    const orderStatus = await this.prisma.orderStatus.findUnique({ where: { id } });
    return success(orderStatus ? OrderStatusMapper.toDomain(orderStatus) : null);
  }

  async findAll(): Promise<Result<OrderStatus[], Error>> {
    const orderStatuses = await this.prisma.orderStatus.findMany();
    return success(orderStatuses.map(OrderStatusMapper.toDomain));
  }

  async save(orderStatus: OrderStatus): Promise<Result<void, Error>> {
    const data = OrderStatusMapper.toPersistence(orderStatus);
    await this.prisma.orderStatus.upsert({
      where: { id: orderStatus.id },
      update: data,
      create: data,
    });
    return success(undefined);
  }

  async delete(id: string): Promise<Result<void, Error>> {
    await this.prisma.orderStatus.delete({ where: { id } });
    return success(undefined);
  }
}
