import { IOrderRepository } from '@/modules/order/domain/order.repository';
import { UpdateOrderDto } from '@/modules/order/application/dtos/update-order.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { Order, OrderItem } from '@/modules/order/domain/order.entity';

export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string, dto: UpdateOrderDto): Promise<Result<Order, HttpError>> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      return failure(HttpError.notFound('Order not found.'));
    }

    let items = order.props.items;
    if (dto.items) {
      const orderItemResults = dto.items.map((item) => OrderItem.create({ ...item, orderId: order.id }));
      const combinedResult = Result.combine(orderItemResults);
      if (combinedResult.isFailure() || !combinedResult.value) {
        return failure(HttpError.badRequest(combinedResult.error?.message || 'Invalid order items'));
      }
      items = combinedResult.value;
    }
    const updatedOrderProps = { ...order.props, ...dto, items };
    const updatedOrderResult = Order.create(updatedOrderProps as any, order.id);

    if (updatedOrderResult.isFailure() || !updatedOrderResult.value) {
      return failure(HttpError.internalServerError(updatedOrderResult.error?.message || 'Could not update order'));
    }

    const updatedOrder = updatedOrderResult.value;

    await this.orderRepository.save(updatedOrder);

    return success(updatedOrder);
  }
}
