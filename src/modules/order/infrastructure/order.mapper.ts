import { Order as PrismaOrder, OrderItem as PrismaOrderItem, OrderStatus as PrismaOrderStatus } from '@prisma/client';
import { Order, OrderItem, IOrderProps, IOrderItemProps, OrderStatus as DomainOrderStatus } from '@/modules/order/domain/order.entity';
import { Result } from '@/core/utils/result';

type PrismaOrderWithItems = PrismaOrder & {
  items: PrismaOrderItem[];
};

export class OrderMapper {
  private static prismaStatusToDomain(status: PrismaOrderStatus): DomainOrderStatus {
    return status as DomainOrderStatus;
  }

  private static domainStatusToPrisma(status: DomainOrderStatus): PrismaOrderStatus {
    return status as PrismaOrderStatus;
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

    const combinedResult = Result.combine(orderItemsResult);
    if (!combinedResult.success) {
      throw new Error(`Could not create domain order item from prisma data: ${combinedResult.error.message}`);
    }
    const orderItems = combinedResult.value;

    const orderProps: IOrderProps = {
      userId: prismaOrder.userId,
      items: orderItems,
      status: OrderMapper.prismaStatusToDomain(prismaOrder.status),
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

  public static toDto(order: Order) {
    return {
      id: order.id,
      user_id: order.props.userId,
      status: order.props.status,
      total: order.props.total,
      created_at: order.props.createdAt,
      updated_at: order.props.updatedAt,
      items: order.props.items.map((item) => ({
        id: item.id,
        product_id: item.props.productId,
        quantity: item.props.quantity,
        price: item.props.price,
      })),
    };
  }

  public static toPersistence(order: Order) {
    const orderData = {
      id: order.id,
      userId: order.userId,
      status: OrderMapper.domainStatusToPrisma(order.status),
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