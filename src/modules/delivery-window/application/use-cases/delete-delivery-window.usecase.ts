import { IDeliveryWindowRepository } from '../../domain/delivery-window.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteDeliveryWindowUseCase {
  constructor(private readonly deliveryWindowRepository: IDeliveryWindowRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const deliveryWindow = await this.deliveryWindowRepository.findById(id);

    if (!deliveryWindow) {
      return failure(HttpError.notFound('DeliveryWindow not found.'));
    }

    await this.deliveryWindowRepository.delete(id);

    return success(undefined);
  }
}