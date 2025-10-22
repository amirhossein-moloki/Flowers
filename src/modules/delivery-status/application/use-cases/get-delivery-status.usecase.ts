import { IDeliveryStatusRepository } from '../domain/delivery-status.repository';
import { DeliveryStatus } from '../domain/delivery-status.entity';
import { Result, success, failure } from '@/core/utils/result';
import { AppError } from '@/core/errors/app-error';

export class GetDeliveryStatusUseCase {
  constructor(private readonly deliveryStatusRepository: IDeliveryStatusRepository) {}

  async execute(id: string): Promise<Result<DeliveryStatus, AppError>> {
    const deliveryStatus = await this.deliveryStatusRepository.findById(id);
    if (!deliveryStatus) {
      return failure(new AppError('DeliveryStatus not found', 404));
    }
    return success(deliveryStatus);
  }
}
