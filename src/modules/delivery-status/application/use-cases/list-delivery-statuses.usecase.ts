import { IDeliveryStatusRepository } from '../../domain/delivery-status.repository';
import { DeliveryStatus } from '../../domain/delivery-status.entity';
import { Result } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';

export class ListDeliveryStatusesUseCase {
  constructor(private readonly deliveryStatusRepository: IDeliveryStatusRepository) {}

  async execute(): Promise<Result<DeliveryStatus[], HttpError>> {
    const result = await this.deliveryStatusRepository.findAll();
    return result;
  }
}
