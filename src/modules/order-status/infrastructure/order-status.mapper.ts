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
    if (orderStatusResult.success === false) {
      throw new Error('Could not map PrismaOrderStatus to domain');
    }
    return orderStatusResult.value;
  }

  static toPersistence(
    orderStatus: OrderStatus,
  ): PrismaOrderStatus {
    return {
      id: orderStatus.id,
      code: orderStatus.props.code,
      name: orderStatus.props.name,
      display_order: orderStatus.props.display_order,
      is_terminal: orderStatus.props.is_terminal,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  static toDto(orderStatus: OrderStatus): any {
    return {
      id: orderStatus.id,
      code: orderStatus.props.code,
      name: orderStatus.props.name,
      display_order: orderStatus.props.display_order,
      is_terminal: orderStatus.props.is_terminal,
    };
  }
}