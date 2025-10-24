import { IOrderRepository } from '@/modules/order/domain/order.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { Order, OrderStatus } from '@/modules/order/domain/order.entity';

export class CancelOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<Result<Order, HttpError>> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      return failure(HttpError.notFound('Order not found.'));
    }

    order.props.status = OrderStatus.CANCELED;

    await this.orderRepository.save(order);

    return success(order);
  }
}
