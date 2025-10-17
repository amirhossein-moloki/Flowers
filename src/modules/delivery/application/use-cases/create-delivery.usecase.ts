import { IDeliveryRepository } from '../../domain/delivery.repository';
import { Delivery } from '../../domain/delivery.entity';
import { CreateDeliveryDto } from '../dtos/create-delivery.dto';
import { DeliveryDto } from '../dtos/delivery.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DeliveryMapper } from '../../infrastructure/delivery.mapper';

export class CreateDeliveryUseCase {
  constructor(private readonly deliveryRepository: IDeliveryRepository) {}

  async execute(dto: CreateDeliveryDto): Promise<Result<DeliveryDto, HttpError>> {
    const deliveryResult = Delivery.create(dto);

    if (!deliveryResult.success) {
      return failure(HttpError.internalServerError(deliveryResult.error.message));
    }

    const delivery = deliveryResult.value;

    await this.deliveryRepository.save(delivery);

    const deliveryDto = DeliveryMapper.toDto(delivery);
    return success(deliveryDto);
  }
}