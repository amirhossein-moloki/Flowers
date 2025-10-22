import { IDriverLocationRepository } from '../../domain/driver-location.repository.interface';
import { DriverLocationDto } from '../../http/dto/driver-location.dto';
import { Result, success, failure } from '@/core/logic/result';
import { HttpError } from '@/core/errors/http-error';
import { DriverLocationMapper } from '../../presentation/mappers/driver-location.mapper';

export class GetDriverLocationUseCase {
  constructor(private readonly driverLocationRepository: IDriverLocationRepository) {}

  async execute(id: string): Promise<Result<DriverLocationDto | null, HttpError>> {
    const driverLocation = await this.driverLocationRepository.findById(id);

    if (!driverLocation) {
      return failure(HttpError.notFound('Driver location not found'));
    }

    const driverLocationDto = DriverLocationMapper.toDto(driverLocation);
    return success(driverLocationDto);
  }
}
