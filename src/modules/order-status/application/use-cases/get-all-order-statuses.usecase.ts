import { IOrderStatusRepository } from '../../domain/order-status.repository';
import { Result, success } from '@/core/utils/result';
import { OrderStatus } from '../../domain/order-status.entity';

export class GetAllOrderStatusesUseCase {
  constructor(private readonly orderStatusRepository: IOrderStatusRepository) {}

  async execute(): Promise<Result<OrderStatus[], Error>> {
    const orderStatuses = await this.orderStatusRepository.findAll();
    return success(orderStatuses);
  }
}
