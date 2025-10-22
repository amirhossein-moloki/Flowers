import { IDriverLocationRepository } from '../../domain/driver-location.repository.interface';
import { UpdateDriverLocationDto } from '../../http/dto/update-driver-location.dto';
import { DriverLocationDto } from '../../http/dto/driver-location.dto';
import { Result, success, failure } from '@/core/logic/result';
import { HttpError } from '@/core/errors/http-error';
import { DriverLocationMapper } from '../../presentation/mappers/driver-location.mapper';

export class UpdateDriverLocationUseCase {
  constructor(private readonly driverLocationRepository: IDriverLocationRepository) {}

  async execute(id: string, dto: UpdateDriverLocationDto): Promise<Result<DriverLocationDto, HttpError>> {
    const driverLocation = await this.driverLocationRepository.findById(id);

    if (!driverLocation) {
      return failure(HttpError.notFound('Driver location not found'));
    }

    Object.assign(driverLocation.props, dto);

    await this.driverLocationRepository.save(driverLocation);

    const driverLocationDto = DriverLocationMapper.toDto(driverLocation);
    return success(driverLocationDto);
  }
}
