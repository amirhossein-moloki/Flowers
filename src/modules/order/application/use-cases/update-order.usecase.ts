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

    const items = dto.items ? dto.items.map((item) => {
      const orderItemResult = OrderItem.create({ ...item, orderId: order.id });
      if (orderItemResult.success === false) {
        throw new Error('Could not create order item');
      }
      return orderItemResult.value;
    }) : order.props.items;
    const updatedOrderProps = { ...order.props, ...dto, items };
    const updatedOrderResult = Order.create(updatedOrderProps as any, order.id);

    if (updatedOrderResult.success === false) {
      return failure(HttpError.internalServerError(updatedOrderResult.error.message));
    }

    const updatedOrder = updatedOrderResult.value;

    await this.orderRepository.save(updatedOrder);

    return success(updatedOrder);
  }
}
