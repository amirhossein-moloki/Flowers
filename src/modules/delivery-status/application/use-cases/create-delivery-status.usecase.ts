import { IDeliveryStatusRepository } from '../../domain/delivery-status.repository';
import { DeliveryStatus } from '../../domain/delivery-status.entity';
import { CreateDeliveryStatusDto } from '../dtos/create-delivery-status.dto';
import { DeliveryStatusDto } from '../dtos/delivery-status.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DeliveryStatusMapper } from '../../infrastructure/delivery-status.mapper';

export class CreateDeliveryStatusUseCase {
  constructor(private readonly deliveryStatusRepository: IDeliveryStatusRepository) {}

  async execute(dto: CreateDeliveryStatusDto): Promise<Result<DeliveryStatusDto, HttpError>> {
    const deliveryStatusResult = DeliveryStatus.create(dto);

    if (!deliveryStatusResult.success) {
      return failure(HttpError.internalServerError(deliveryStatusResult.error.message));
    }

    const deliveryStatus = deliveryStatusResult.value;

    await this.deliveryStatusRepository.save(deliveryStatus);

    const deliveryStatusDto = DeliveryStatusMapper.toDto(deliveryStatus);
    return success(deliveryStatusDto);
  }
}