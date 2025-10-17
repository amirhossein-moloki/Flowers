import { IDeliveryWindowRepository } from '../../domain/delivery-window.repository';
import { DeliveryWindowDto } from '../dtos/delivery-window.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DeliveryWindowMapper } from '../../infrastructure/delivery-window.mapper';

export class GetDeliveryWindowUseCase {
  constructor(private readonly deliveryWindowRepository: IDeliveryWindowRepository) {}

  async execute(id: string): Promise<Result<DeliveryWindowDto, HttpError>> {
    const deliveryWindow = await this.deliveryWindowRepository.findById(id);

    if (!deliveryWindow) {
      return failure(HttpError.notFound('DeliveryWindow not found.'));
    }

    const deliveryWindowDto = DeliveryWindowMapper.toDto(deliveryWindow);
    return success(deliveryWindowDto);
  }
}