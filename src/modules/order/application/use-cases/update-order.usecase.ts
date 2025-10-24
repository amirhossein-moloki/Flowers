import { IOrderRepository } from '@/modules/order/domain/order.repository';
import { UpdateOrderDto } from '@/modules/order/application/dtos/update-order.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { Order } from '@/modules/order/domain/order.entity';

export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string, dto: UpdateOrderDto): Promise<Result<Order, HttpError>> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      return failure(HttpError.notFound('Order not found.'));
    }

    const updatedOrderProps = { ...order.props, ...dto };
    const updatedOrderResult = Order.create(updatedOrderProps, order.id);

    if(!updatedOrderResult.success){
        return failure(HttpError.internalServerError(updatedOrderResult.error.message));
    }

    const updatedOrder = updatedOrderResult.value;

    await this.orderRepository.save(updatedOrder);

    return success(updatedOrder);
  }
}
