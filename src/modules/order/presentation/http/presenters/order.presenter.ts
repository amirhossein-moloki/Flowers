import { Order, OrderItem } from '../../../domain/order.entity';

class OrderItemPresenter {
  static toJSON(item: OrderItem) {
    return {
      id: item.id,
      product_id: item.props.productId,
      quantity: item.props.quantity,
      price: item.props.price,
    };
  }
}

export class OrderPresenter {
  static toJSON(order: Order) {
    return {
      id: order.id,
      user_id: order.props.userId,
      status: order.props.status,
      total: order.props.total,
      created_at: order.props.createdAt,
      updated_at: order.props.updatedAt,
      items: order.props.items.map(OrderItemPresenter.toJSON),
    };
  }
}
