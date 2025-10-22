import { IDeliveryStatusRepository } from '../domain/delivery-status.repository';
import { DeliveryStatus } from '../domain/delivery-status.entity';
import { Result, success } from '@/core/utils/result';

export class ListDeliveryStatusesUseCase {
  constructor(private readonly deliveryStatusRepository: IDeliveryStatusRepository) {}

  async execute(): Promise<Result<DeliveryStatus[], Error>> {
    const deliveryStatuses = await this.deliveryStatusRepository.findAll();
    return success(deliveryStatuses);
  }
}
