import { IOrderStatusRepository } from '../../domain/order-status.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class DeleteOrderStatusUseCase {
  constructor(private readonly orderStatusRepository: IOrderStatusRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const orderStatus = await this.orderStatusRepository.findById(id);

    if (!orderStatus) {
      return failure(HttpError.notFound('OrderStatus not found.'));
    }

    await this.orderStatusRepository.delete(id);

    return success(undefined);
  }
}