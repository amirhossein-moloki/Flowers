import { IOrderRepository } from '../../domain/order.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteOrderUseCase {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      return failure(HttpError.notFound('Order not found.'));
    }

    await this.orderRepository.delete(id);

    return success(undefined);
  }
}