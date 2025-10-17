import { IOrderRepository } from '../../domain/order.repository';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { OrderDto } from '../dtos/order.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { OrderMapper } from '../../infrastructure/order.mapper';
import { Order } from '../../domain/order.entity';

export class UpdateOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string, dto: UpdateOrderDto): Promise<Result<OrderDto, HttpError>> {
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

    const orderDto = OrderMapper.toDto(updatedOrder);
    return success(orderDto);
  }
}