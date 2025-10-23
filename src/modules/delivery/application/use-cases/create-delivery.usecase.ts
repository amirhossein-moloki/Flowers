import { IDeliveryRepository } from '../../domain/delivery.repository.interface';
import { Delivery } from '../../domain/delivery.entity';
import { CreateDeliveryDto } from '../dtos/create-delivery.dto';
import { DeliveryDto } from '../dtos/delivery.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { randomUUID } from 'crypto';
import { DeliveryPresenter } from '../../http/presenters/delivery.presenter';

export class CreateDeliveryUseCase {
  constructor(private readonly deliveryRepository: IDeliveryRepository) {}

  async execute(dto: CreateDeliveryDto): Promise<Result<DeliveryDto, HttpError>> {
    const deliveryResult = Delivery.create({
      ...dto,
      tracking_number: randomUUID(),
    });

    if (!deliveryResult.success) {
      return failure(HttpError.internalServerError(deliveryResult.error.message));
    }

    const delivery = deliveryResult.value;

    await this.deliveryRepository.save(delivery);

    return success(DeliveryPresenter.toDto(delivery));
  }
}
