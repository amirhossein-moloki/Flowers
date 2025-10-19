import { IDeliveryWindowRepository } from '../../domain/delivery-window.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { DeliveryWindow } from '../../domain/delivery-window.entity';

export class GetDeliveryWindowByIdUseCase {
  constructor(private readonly deliveryWindowRepository: IDeliveryWindowRepository) {}

  async execute(id: string): Promise<Result<DeliveryWindow, HttpError>> {
    const deliveryWindow = await this.deliveryWindowRepository.findById(id);

    if (!deliveryWindow) {
      return failure(HttpError.notFound('DeliveryWindow not found.'));
    }

    return success(deliveryWindow);
  }
}