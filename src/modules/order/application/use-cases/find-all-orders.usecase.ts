import { IOrderRepository } from '@/modules/order/domain/order.repository';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { Order } from '@/modules/order/domain/order.entity';

export class FindAllOrdersUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(userId: string, page: number, pageSize: number): Promise<Result<Order[], HttpError>> {
    const orders = await this.orderRepository.findByUserId(userId, page, pageSize);
    return success(orders);
  }
}
