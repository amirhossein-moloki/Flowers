import { IOrderStatusRepository } from '../../domain/order-status.repository';
import { OrderStatus } from '../../domain/order-status.entity';
import { CreateOrderStatusDto } from '../dtos/create-order-status.dto';
import { OrderStatusDto } from '../dtos/order-status.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { OrderStatusMapper } from '../../infrastructure/order-status.mapper';

export class CreateOrderStatusUseCase {
  constructor(private readonly orderStatusRepository: IOrderStatusRepository) {}

  async execute(dto: CreateOrderStatusDto): Promise<Result<OrderStatusDto, HttpError>> {
    const orderStatusResult = OrderStatus.create(dto);

    if (!orderStatusResult.success) {
      return failure(HttpError.internalServerError(orderStatusResult.error.message));
    }

    const orderStatus = orderStatusResult.value;

    const savedOrderStatus = await this.orderStatusRepository.save(orderStatus);

    if (savedOrderStatus.success === false) {
      return failure(HttpError.internalServerError(savedOrderStatus.error.message));
    }

    const orderStatusDto = OrderStatusMapper.toDto(savedOrderStatus.value);
    return success(orderStatusDto);
  }
}