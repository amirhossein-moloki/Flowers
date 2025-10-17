import { IOrderStatusRepository } from '../../domain/order-status.repository';
import { OrderStatusDto } from '../dtos/order-status.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { OrderStatusMapper } from '../../infrastructure/order-status.mapper';

export class GetOrderStatusUseCase {
  constructor(private readonly orderStatusRepository: IOrderStatusRepository) {}

  async execute(id: string): Promise<Result<OrderStatusDto, HttpError>> {
    const orderStatus = await this.orderStatusRepository.findById(id);

    if (!orderStatus) {
      return failure(HttpError.notFound('OrderStatus not found.'));
    }

    const orderStatusDto = OrderStatusMapper.toDto(orderStatus);
    return success(orderStatusDto);
  }
}