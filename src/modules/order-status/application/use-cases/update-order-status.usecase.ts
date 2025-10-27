import { IOrderStatusRepository } from '../../domain/order-status.repository';
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto';
import { OrderStatusDto } from '../dtos/order-status.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { OrderStatusMapper } from '../../infrastructure/order-status.mapper';
import { OrderStatus } from '../../domain/order-status.entity';

export class UpdateOrderStatusUseCase {
  constructor(private readonly orderStatusRepository: IOrderStatusRepository) {}

  async execute(id: string, dto: UpdateOrderStatusDto): Promise<Result<OrderStatusDto, HttpError>> {
    const orderStatusResult = await this.orderStatusRepository.findById(id);

    if (orderStatusResult.success === false) {
      return failure(HttpError.internalServerError(orderStatusResult.error.message));
    }

    if (!orderStatusResult.value) {
      return failure(HttpError.notFound('OrderStatus not found.'));
    }

    const orderStatus = orderStatusResult.value;
    const updatedOrderStatusProps = { ...orderStatus.props, ...dto };
    const updatedOrderStatusResult = OrderStatus.create(updatedOrderStatusProps, orderStatus.id);

    if (updatedOrderStatusResult.success === false) {
      return failure(HttpError.internalServerError(updatedOrderStatusResult.error.message));
    }

    const updatedOrderStatus = updatedOrderStatusResult.value;

    const savedOrderStatus = await this.orderStatusRepository.save(updatedOrderStatus);

    if (savedOrderStatus.success === false) {
      return failure(HttpError.internalServerError(savedOrderStatus.error.message));
    }

    const orderStatusDto = OrderStatusMapper.toDto(savedOrderStatus.value);
    return success(orderStatusDto);
  }
}