import { ICourierRepository } from '../../domain/courier.repository';
import { UpdateCourierDto } from '../dtos/update-courier.dto';
import { CourierDto } from '../dtos/courier.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { CourierMapper } from '../../infrastructure/courier.mapper';
import { Courier } from '../../domain/courier.entity';

export class UpdateCourierUseCase {
  constructor(private readonly courierRepository: ICourierRepository) {}

  async execute(id: string, dto: UpdateCourierDto): Promise<Result<CourierDto, HttpError>> {
    const courier = await this.courierRepository.findById(id);

    if (!courier) {
      return failure(HttpError.notFound('Courier not found.'));
    }

    const updatedCourierProps = { ...courier.props, ...dto };
    const updatedCourierResult = Courier.create(updatedCourierProps, courier.id);

    if(!updatedCourierResult.success){
        return failure(HttpError.internalServerError(updatedCourierResult.error.message));
    }

    const updatedCourier = updatedCourierResult.value;

    await this.courierRepository.save(updatedCourier);

    const courierDto = CourierMapper.toDto(updatedCourier);
    return success(courierDto);
  }
}