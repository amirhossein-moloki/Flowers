import { IDeliveryWindowRepository } from '../../domain/delivery-window.repository';
import { UpdateDeliveryWindowDto } from '../dtos/update-delivery-window.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { DeliveryWindow } from '../../domain/delivery-window.entity';

export class UpdateDeliveryWindowUseCase {
  constructor(private readonly deliveryWindowRepository: IDeliveryWindowRepository) {}

  async execute(id: string, dto: UpdateDeliveryWindowDto): Promise<Result<DeliveryWindow, HttpError>> {
    const deliveryWindow = await this.deliveryWindowRepository.findById(id);

    if (!deliveryWindow) {
      return failure(HttpError.notFound('DeliveryWindow not found.'));
    }

    const updatedDeliveryWindowProps = { ...deliveryWindow.props, ...dto };
    const updatedDeliveryWindowResult = DeliveryWindow.create(updatedDeliveryWindowProps, deliveryWindow.id);

    if (updatedDeliveryWindowResult.success === false) {
      return failure(HttpError.internalServerError(updatedDeliveryWindowResult.error.message));
    }

    const updatedDeliveryWindow = updatedDeliveryWindowResult.value;

    await this.deliveryWindowRepository.save(updatedDeliveryWindow);

    return success(updatedDeliveryWindow);
  }
}