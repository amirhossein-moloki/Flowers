import { IDriverLocationRepository } from '../../domain/driver-location.repository';
import { UpdateDriverLocationDto } from '../dtos/update-driver-location.dto';
import { DriverLocationDto } from '../dtos/driver-location.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { DriverLocationMapper } from '../../infrastructure/driver-location.mapper';
import { DriverLocation } from '../../domain/driver-location.entity';

export class UpdateDriverLocationUseCase {
  constructor(private readonly driverLocationRepository: IDriverLocationRepository) {}

  async execute(id: string, dto: UpdateDriverLocationDto): Promise<Result<DriverLocationDto, HttpError>> {
    const driverLocation = await this.driverLocationRepository.findById(id);

    if (!driverLocation) {
      return failure(HttpError.notFound('DriverLocation not found.'));
    }

    const updatedDriverLocationProps = { ...driverLocation.props, ...dto };
    const updatedDriverLocationResult = DriverLocation.create(updatedDriverLocationProps, driverLocation.id);

    if(!updatedDriverLocationResult.success){
        return failure(HttpError.internalServerError(updatedDriverLocationResult.error.message));
    }

    const updatedDriverLocation = updatedDriverLocationResult.value;

    await this.driverLocationRepository.save(updatedDriverLocation);

    const driverLocationDto = DriverLocationMapper.toDto(updatedDriverLocation);
    return success(driverLocationDto);
  }
}