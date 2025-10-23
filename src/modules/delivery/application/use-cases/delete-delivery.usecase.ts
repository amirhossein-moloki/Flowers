import { IDeliveryRepository } from '../../domain/delivery.repository.interface';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class DeleteDeliveryUseCase {
  constructor(private readonly deliveryRepository: IDeliveryRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const delivery = await this.deliveryRepository.findById(id);

    if (!delivery) {
      return failure(HttpError.notFound('Delivery not found.'));
    }

    await this.deliveryRepository.delete(id);

    return success(undefined);
  }
}
