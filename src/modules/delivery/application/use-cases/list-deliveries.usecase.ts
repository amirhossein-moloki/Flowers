import { IDeliveryRepository } from '../../domain/delivery.repository.interface';
import { DeliveryDto } from '../dtos/delivery.dto';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { DeliveryPresenter } from '../../http/presenters/delivery.presenter';

export class ListDeliveriesUseCase {
  constructor(private readonly deliveryRepository: IDeliveryRepository) {}

  async execute(): Promise<Result<DeliveryDto[], HttpError>> {
    const deliveries = await this.deliveryRepository.findAll(1, 100);
    const deliveryDtos = deliveries.map(DeliveryPresenter.toDto);
    return success(deliveryDtos);
  }
}
