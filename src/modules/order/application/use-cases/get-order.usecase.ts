import { IOrderRepository } from '../../domain/order.repository';
import { OrderDto } from '../dtos/order.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { OrderMapper } from '../../infrastructure/order.mapper';

export class GetOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<Result<OrderDto, HttpError>> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      return failure(HttpError.notFound('Order not found.'));
    }

    const orderDto = OrderMapper.toDto(order);
    return success(orderDto);
  }
}