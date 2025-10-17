import { IDeliveryWindowRepository } from '../../domain/delivery-window.repository';
import { DeliveryWindow } from '../../domain/delivery-window.entity';
import { CreateDeliveryWindowDto } from '../dtos/create-delivery-window.dto';
import { DeliveryWindowDto } from '../dtos/delivery-window.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DeliveryWindowMapper } from '../../infrastructure/delivery-window.mapper';

export class CreateDeliveryWindowUseCase {
  constructor(private readonly deliveryWindowRepository: IDeliveryWindowRepository) {}

  async execute(dto: CreateDeliveryWindowDto): Promise<Result<DeliveryWindowDto, HttpError>> {
    const deliveryWindowResult = DeliveryWindow.create(dto);

    if (!deliveryWindowResult.success) {
      return failure(HttpError.internalServerError(deliveryWindowResult.error.message));
    }

    const deliveryWindow = deliveryWindowResult.value;

    await this.deliveryWindowRepository.save(deliveryWindow);

    const deliveryWindowDto = DeliveryWindowMapper.toDto(deliveryWindow);
    return success(deliveryWindowDto);
  }
}