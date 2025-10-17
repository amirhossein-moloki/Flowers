import { IDeliveryStatusRepository } from '../../domain/delivery-status.repository';
import { UpdateDeliveryStatusDto } from '../dtos/update-delivery-status.dto';
import { DeliveryStatusDto } from '../dtos/delivery-status.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DeliveryStatusMapper } from '../../infrastructure/delivery-status.mapper';
import { DeliveryStatus } from '../../domain/delivery-status.entity';

export class UpdateDeliveryStatusUseCase {
  constructor(private readonly deliveryStatusRepository: IDeliveryStatusRepository) {}

  async execute(id: string, dto: UpdateDeliveryStatusDto): Promise<Result<DeliveryStatusDto, HttpError>> {
    const deliveryStatus = await this.deliveryStatusRepository.findById(id);

    if (!deliveryStatus) {
      return failure(HttpError.notFound('DeliveryStatus not found.'));
    }

    const updatedDeliveryStatusProps = { ...deliveryStatus.props, ...dto };
    const updatedDeliveryStatusResult = DeliveryStatus.create(updatedDeliveryStatusProps, deliveryStatus.id);

    if(!updatedDeliveryStatusResult.success){
        return failure(HttpError.internalServerError(updatedDeliveryStatusResult.error.message));
    }

    const updatedDeliveryStatus = updatedDeliveryStatusResult.value;

    await this.deliveryStatusRepository.save(updatedDeliveryStatus);

    const deliveryStatusDto = DeliveryStatusMapper.toDto(updatedDeliveryStatus);
    return success(deliveryStatusDto);
  }
}