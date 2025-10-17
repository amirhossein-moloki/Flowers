import { IDriverLocationRepository } from '../../domain/driver-location.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteDriverLocationUseCase {
  constructor(private readonly driverLocationRepository: IDriverLocationRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const driverLocation = await this.driverLocationRepository.findById(id);

    if (!driverLocation) {
      return failure(HttpError.notFound('DriverLocation not found.'));
    }

    await this.driverLocationRepository.delete(id);

    return success(undefined);
  }
}