import { ICourierRepository } from '../../domain/courier.repository';
import { CourierDto } from '../dtos/courier.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { CourierMapper } from '../../infrastructure/courier.mapper';

export class GetCourierUseCase {
  constructor(private readonly courierRepository: ICourierRepository) {}

  async execute(id: string): Promise<Result<CourierDto, HttpError>> {
    const courier = await this.courierRepository.findById(id);

    if (!courier) {
      return failure(HttpError.notFound('Courier not found.'));
    }

    const courierDto = CourierMapper.toDto(courier);
    return success(courierDto);
  }
}