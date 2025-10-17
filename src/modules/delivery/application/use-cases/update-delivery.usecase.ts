import { IDeliveryRepository } from '../../domain/delivery.repository';
import { UpdateDeliveryDto } from '../dtos/update-delivery.dto';
import { DeliveryDto } from '../dtos/delivery.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DeliveryMapper } from '../../infrastructure/delivery.mapper';
import { Delivery } from '../../domain/delivery.entity';

export class UpdateDeliveryUseCase {
  constructor(private readonly deliveryRepository: IDeliveryRepository) {}

  async execute(id: string, dto: UpdateDeliveryDto): Promise<Result<DeliveryDto, HttpError>> {
    const delivery = await this.deliveryRepository.findById(id);

    if (!delivery) {
      return failure(HttpError.notFound('Delivery not found.'));
    }

    const updatedDeliveryProps = { ...delivery.props, ...dto };
    const updatedDeliveryResult = Delivery.create(updatedDeliveryProps, delivery.id);

    if(!updatedDeliveryResult.success){
        return failure(HttpError.internalServerError(updatedDeliveryResult.error.message));
    }

    const updatedDelivery = updatedDeliveryResult.value;

    await this.deliveryRepository.save(updatedDelivery);

    const deliveryDto = DeliveryMapper.toDto(updatedDelivery);
    return success(deliveryDto);
  }
}