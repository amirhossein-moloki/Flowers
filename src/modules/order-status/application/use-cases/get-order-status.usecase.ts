import { IOrderStatusRepository } from '../../domain/order-status.repository';
import { Result, success, failure } from '@/core/utils/result';
import { OrderStatus } from '../../domain/order-status.entity';
import { NotFoundError } from '@/core/errors/not-found.error';

export class GetOrderStatusUseCase {
  constructor(private readonly orderStatusRepository: IOrderStatusRepository) {}

  async execute(id: string): Promise<Result<OrderStatus, Error>> {
    const orderStatus = await this.orderStatusRepository.findById(id);

    if (!orderStatus) {
      return failure(new NotFoundError('OrderStatus not found.'));
    }

    return success(orderStatus);
  }
}
