import { IOrderStatusRepository } from '../domain/order-status.repository';
import { OrderStatus } from '../domain/order-status.entity';
import { OrderStatus as PrismaOrderStatus } from '@prisma/client';
import { Result, success } from '@/core/utils/result';

export class PrismaOrderStatusRepository implements IOrderStatusRepository {
  async findById(id: string): Promise<Result<OrderStatus | null, Error>> {
    const orderStatus = Object.values(PrismaOrderStatus).find((status) => status === id);
    if (!orderStatus) {
      return success(null);
    }
    const domainStatus = OrderStatus.create({
      code: orderStatus,
      name: orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1).toLowerCase(),
      display_order: Object.values(PrismaOrderStatus).indexOf(orderStatus),
    });
    return success(domainStatus.value);
  }

  async findAll(): Promise<Result<OrderStatus[], Error>> {
    const orderStatuses = Object.values(PrismaOrderStatus).map((status, index) => {
      return OrderStatus.create({
        code: status,
        name: status.charAt(0).toUpperCase() + status.slice(1).toLowerCase(),
        display_order: index,
      }).value;
    });
    return success(orderStatuses);
  }
}
