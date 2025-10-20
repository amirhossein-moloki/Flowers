import { IOrderRepository } from '../../domain/order.repository';
import { OrderDto } from '../dtos/order.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { OrderMapper } from '../../infrastructure/order.mapper';

export class FindAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(userId: string, page: number, pageSize: number): Promise<Result<OrderDto[], HttpError>> {
    const orders = await this.orderRepository.findByUserId(userId, page, pageSize);
    const orderDtos = orders.map(OrderMapper.toDto);
    return success(orderDtos);
  }
}
