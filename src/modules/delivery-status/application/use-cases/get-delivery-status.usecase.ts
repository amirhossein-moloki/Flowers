import { IDeliveryStatusRepository } from '../../domain/delivery-status.repository';
import { DeliveryStatusDto } from '../dtos/delivery-status.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DeliveryStatusMapper } from '../../infrastructure/delivery-status.mapper';

export class GetDeliveryStatusUseCase {
  constructor(private readonly deliveryStatusRepository: IDeliveryStatusRepository) {}

  async execute(id: string): Promise<Result<DeliveryStatusDto, HttpError>> {
    const deliveryStatus = await this.deliveryStatusRepository.findById(id);

    if (!deliveryStatus) {
      return failure(HttpError.notFound('DeliveryStatus not found.'));
    }

    const deliveryStatusDto = DeliveryStatusMapper.toDto(deliveryStatus);
    return success(deliveryStatusDto);
  }
}