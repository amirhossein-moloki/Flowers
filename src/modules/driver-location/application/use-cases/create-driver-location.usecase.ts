import { IDriverLocationRepository } from '../../domain/driver-location.repository.interface';
import { DriverLocation } from '../../domain/driver-location.entity';
import { CreateDriverLocationDto } from '../../http/dto/create-driver-location.dto';
import { DriverLocationDto } from '../../http/dto/driver-location.dto';
import { Result, success, failure } from '@/core/logic/result';
import { HttpError } from '@/core/errors/http-error';
import { DriverLocationMapper } from '../../presentation/mappers/driver-location.mapper';

export class CreateDriverLocationUseCase {
  constructor(private readonly driverLocationRepository: IDriverLocationRepository) {}

  async execute(dto: CreateDriverLocationDto): Promise<Result<DriverLocationDto, HttpError>> {
    const driverLocationResult = DriverLocation.create(dto);

    if (!driverLocationResult.success) {
      return failure(HttpError.internalServerError(driverLocationResult.error.message));
    }

    const driverLocation = driverLocationResult.value;

    await this.driverLocationRepository.save(driverLocation);

    const driverLocationDto = DriverLocationMapper.toDto(driverLocation);
    return success(driverLocationDto);
  }
}
