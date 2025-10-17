import { IDeliveryRepository } from '../../domain/delivery.repository';
import { DeliveryDto } from '../dtos/delivery.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DeliveryMapper } from '../../infrastructure/delivery.mapper';

export class GetDeliveryUseCase {
  constructor(private readonly deliveryRepository: IDeliveryRepository) {}

  async execute(id: string): Promise<Result<DeliveryDto, HttpError>> {
    const delivery = await this.deliveryRepository.findById(id);

    if (!delivery) {
      return failure(HttpError.notFound('Delivery not found.'));
    }

    const deliveryDto = DeliveryMapper.toDto(delivery);
    return success(deliveryDto);
  }
}