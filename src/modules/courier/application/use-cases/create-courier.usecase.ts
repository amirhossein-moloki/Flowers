import { ICourierRepository } from '../../domain/courier.repository';
import { Courier } from '../../domain/courier.entity';
import { CreateCourierDto } from '../dtos/create-courier.dto';
import { CourierDto } from '../dtos/courier.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { CourierMapper } from '../../infrastructure/courier.mapper';

export class CreateCourierUseCase {
  constructor(private readonly courierRepository: ICourierRepository) {}

  async execute(dto: CreateCourierDto): Promise<Result<CourierDto, HttpError>> {
    const courierResult = Courier.create(dto);

    if (!courierResult.success) {
      return failure(HttpError.internalServerError(courierResult.error.message));
    }

    const courier = courierResult.value;

    await this.courierRepository.save(courier);

    const courierDto = CourierMapper.toDto(courier);
    return success(courierDto);
  }
}