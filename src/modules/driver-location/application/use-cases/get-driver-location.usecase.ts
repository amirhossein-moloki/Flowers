import { IDriverLocationRepository } from '../../domain/driver-location.repository';
import { DriverLocationDto } from '../dtos/driver-location.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DriverLocationMapper } from '../../infrastructure/driver-location.mapper';

export class GetDriverLocationUseCase {
  constructor(private readonly driverLocationRepository: IDriverLocationRepository) {}

  async execute(id: string): Promise<Result<DriverLocationDto, HttpError>> {
    const driverLocation = await this.driverLocationRepository.findById(id);

    if (!driverLocation) {
      return failure(HttpError.notFound('DriverLocation not found.'));
    }

    const driverLocationDto = DriverLocationMapper.toDto(driverLocation);
    return success(driverLocationDto);
  }
}