import { IDeliveryWindowRepository } from '../../domain/delivery-window.repository';
import { DeliveryWindow } from '../../domain/delivery-window.entity';
import { Result, success } from '@/core/utils/result';

export class GetAllDeliveryWindowsUseCase {
  constructor(private readonly deliveryWindowRepository: IDeliveryWindowRepository) {}

  async execute(): Promise<Result<DeliveryWindow[], Error>> {
    const deliveryWindows = await this.deliveryWindowRepository.findAll();
    return success(deliveryWindows);
  }
}