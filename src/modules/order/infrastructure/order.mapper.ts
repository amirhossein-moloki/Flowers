import { Order as PrismaOrder, OrderItem as PrismaOrderItem, OrderStatus as PrismaOrderStatus } from '@prisma/client';
import { Order, OrderItem, IOrderProps, IOrderItemProps, OrderStatus } from '../domain/order.entity';

type PrismaOrderWithItems = PrismaOrder & {
  items: PrismaOrderItem[];
};

export class OrderMapper {
  private static prismaStatusToDomain(status: PrismaOrderStatus): OrderStatus {
    return OrderStatus[status];
  }

  private static domainStatusToPrisma(status: OrderStatus): PrismaOrderStatus {
    return PrismaOrderStatus[status];
  }

  public static toDomain(prismaOrder: PrismaOrderWithItems): Order {
    const orderItemsResult = prismaOrder.items.map((item) => {
      const orderItemProps: IOrderItemProps = {
        orderId: item.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      };
      return OrderItem.create(orderItemProps, item.id);
    });

    const orderItems: OrderItem[] = [];
    for (const result of orderItemsResult) {
      if (result.success) {
        orderItems.push(result.value);
      } else {
        throw new Error(`Could not create domain order item from prisma data: ${result.error.message}`);
      }
    }

    const orderProps: IOrderProps = {
      userId: prismaOrder.userId,
      items: orderItems,
      status: this.prismaStatusToDomain(prismaOrder.status),
      total: prismaOrder.total,
      createdAt: prismaOrder.createdAt,
      updatedAt: prismaOrder.updatedAt,
    };

    const orderResult = Order.create(orderProps, prismaOrder.id);
    if (!orderResult.success) {
      throw new Error(`Could not create domain order from prisma data: ${orderResult.error.message}`);
    }

    return orderResult.value;
  }

  public static toPersistence(order: Order) {
    const orderData = {
      id: order.id,
      userId: order.userId,
      status: this.domainStatusToPrisma(order.status),
      total: order.total,
    };

    const itemsData = order.items.map((item) => ({
      id: item.id,
      orderId: order.id,
      productId: item.props.productId,
      quantity: item.props.quantity,
      price: item.props.price,
    }));

    return { orderData, itemsData };
  }
}