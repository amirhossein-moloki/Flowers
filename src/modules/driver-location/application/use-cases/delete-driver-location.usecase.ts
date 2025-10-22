import { IDriverLocationRepository } from '../../domain/driver-location.repository.interface';
import { Result, success, failure } from '@/core/logic/result';
import { HttpError } from '@/core/errors/http-error';

export class DeleteDriverLocationUseCase {
  constructor(private readonly driverLocationRepository: IDriverLocationRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    try {
      await this.driverLocationRepository.delete(id);
      return success(undefined);
    } catch (error) {
      return failure(HttpError.internalServerError('Failed to delete driver location'));
    }
  }
}
