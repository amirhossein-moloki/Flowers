import { IShippingRateRepository } from '../../domain/shipping-rate.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class DeleteShippingRateUseCase {
  constructor(private readonly shippingRateRepository: IShippingRateRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const existingShippingRate = await this.shippingRateRepository.findById(id);
    if (!existingShippingRate) {
      return failure(HttpError.notFound('Shipping rate not found.'));
    }

    await this.shippingRateRepository.delete(id);

    return success(undefined);
  }
}
