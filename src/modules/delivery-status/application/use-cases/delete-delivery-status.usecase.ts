import { IDeliveryStatusRepository } from '../../domain/delivery-status.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class DeleteDeliveryStatusUseCase {
  constructor(private readonly deliveryStatusRepository: IDeliveryStatusRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const deliveryStatus = await this.deliveryStatusRepository.findById(id);

    if (!deliveryStatus) {
      return failure(HttpError.notFound('DeliveryStatus not found.'));
    }

    await this.deliveryStatusRepository.delete(id);

    return success(undefined);
  }
}