import { ICourierRepository } from '../../domain/courier.repository';
import { CourierDto } from '../dtos/courier.dto';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { CourierMapper } from '../../infrastructure/courier.mapper';

export class ListCouriersUseCase {
  constructor(private readonly courierRepository: ICourierRepository) {}

  async execute(): Promise<Result<CourierDto[], HttpError>> {
    const couriers = await this.courierRepository.findAll(1, 100);
    const courierDtos = couriers.map(CourierMapper.toDto);
    return success(courierDtos);
  }
}
