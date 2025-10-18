import { OrderStatus as PrismaOrderStatus } from '@prisma/client';
import { OrderStatus } from '../domain/order-status.entity';

export class OrderStatusMapper {
  static toDomain(
    prismaOrderStatus: PrismaOrderStatus,
  ): OrderStatus {
    const orderStatusResult = OrderStatus.create(
      {
        code: prismaOrderStatus.code,
        name: prismaOrderStatus.name,
        display_order: prismaOrderStatus.display_order,
        is_terminal: prismaOrderStatus.is_terminal,
      },
      prismaOrderStatus.id,
    );
    if (orderStatusResult.isFailure) {
      throw new Error('Could not map PrismaOrderStatus to domain');
    }
    return orderStatusResult.value;
  }

  static toPersistence(
    orderStatus: OrderStatus,
  ): PrismaOrderStatus {
    return {
      id: orderStatus.id,
      code: orderStatus.code,
      name: orderStatus.name,
      display_order: orderStatus.display_order,
      is_terminal: orderStatus.is_terminal,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}