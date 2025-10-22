import { ICourierRepository } from '../../domain/courier.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class DeleteCourierUseCase {
  constructor(private readonly courierRepository: ICourierRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const courier = await this.courierRepository.findById(id);

    if (!courier) {
      return failure(HttpError.notFound('Courier not found.'));
    }

    await this.courierRepository.delete(id);

    return success(undefined);
  }
}