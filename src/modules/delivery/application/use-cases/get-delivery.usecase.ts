import { IDeliveryRepository } from '../../domain/delivery.repository.interface';
import { DeliveryDto } from '../dtos/delivery.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { DeliveryPresenter } from '../../http/presenters/delivery.presenter';

export class GetDeliveryUseCase {
  constructor(private readonly deliveryRepository: IDeliveryRepository) {}

  async execute(id: string): Promise<Result<DeliveryDto, HttpError>> {
    const delivery = await this.deliveryRepository.findById(id);

    if (!delivery) {
      return failure(HttpError.notFound('Delivery not found.'));
    }

    const deliveryDto = DeliveryPresenter.toDto(delivery);
    return success(deliveryDto);
  }
}
