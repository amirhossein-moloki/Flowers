import { OrderStatus } from '@/modules/order-status/domain/order-status.entity';

export class OrderStatusPresenter {
  static toDTO(orderStatus: OrderStatus) {
    return {
      id: orderStatus.id,
      code: orderStatus.code,
      name: orderStatus.name,
      display_order: orderStatus.display_order,
      is_terminal: orderStatus.is_terminal,
    };
  }
}
