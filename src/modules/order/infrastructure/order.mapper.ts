import { Order as PrismaOrder, OrderItem as PrismaOrderItem } from '@prisma/client';
import { Order } from '../domain/order.entity';
import { OrderItem } from '../domain/order-item.entity';

type PrismaOrderWithItems = PrismaOrder & { items: PrismaOrderItem[] };

export class OrderMapper {
  public static toDomain(raw: PrismaOrderWithItems): Order {
    const orderItems = raw.items.map((item) =>
      OrderItem.create(
        {
          orderId: item.orderId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price.toNumber(),
        },
        item.id,
      ).value
    );

    const orderResult = Order.create(
      {
        userId: raw.userId,
        items: orderItems,
        total: raw.total.toNumber(),
        status: raw.status,
        createdAt: raw.createdAt,
      },
      raw.id,
    );

    return orderResult.value;
  }

  public static toPersistence(order: Order) {
    const orderData = {
      id: order.id,
      userId: order.userId,
      total: order.total,
      status: order.status,
    };

    const itemsData = order.props.items.map((item) => ({
      id: item.id,
      orderId: order.id,
      productId: item.props.productId,
      quantity: item.props.quantity,
      price: item.props.price,
    }));

    return { ...orderData, items: itemsData };
  }
}