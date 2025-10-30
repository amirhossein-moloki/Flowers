import { IDeliveryStatusRepository } from '../../domain/delivery-status.repository';
import { DeliveryStatus } from '../../domain/delivery-status.entity';
import { Result } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';

export class GetDeliveryStatusUseCase {
  constructor(private readonly deliveryStatusRepository: IDeliveryStatusRepository) {}

  async execute(id: string): Promise<Result<DeliveryStatus | null, HttpError>> {
    const result = await this.deliveryStatusRepository.findById(id);
    return result;
  }
}
