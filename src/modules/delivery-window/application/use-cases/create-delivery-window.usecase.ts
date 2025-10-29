import { IDeliveryWindowRepository } from '../../domain/delivery-window.repository';
import { DeliveryWindow } from '../../domain/delivery-window.entity';
import { CreateDeliveryWindowDto } from '../dtos/create-delivery-window.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class CreateDeliveryWindowUseCase {
  constructor(private readonly deliveryWindowRepository: IDeliveryWindowRepository) {}

  async execute(dto: CreateDeliveryWindowDto): Promise<Result<DeliveryWindow, HttpError>> {
    const deliveryWindowResult = DeliveryWindow.create({
      label: dto.label ?? '',
      start_time: dto.start_time ?? '',
      end_time: dto.end_time ?? '',
      cutoff_time: dto.cutoff_time ?? '',
      zone_id: dto.zone_id ?? '',
      is_active: dto.is_active ?? true,
    });

    if (deliveryWindowResult.success === false) {
      return failure(HttpError.internalServerError(deliveryWindowResult.error.message));
    }

    const deliveryWindow = deliveryWindowResult.value;

    await this.deliveryWindowRepository.save(deliveryWindow);

    return success(deliveryWindow);
  }
}
