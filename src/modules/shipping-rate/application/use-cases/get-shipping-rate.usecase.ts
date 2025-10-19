import { IShippingRateRepository } from '../../domain/shipping-rate.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ShippingRate } from '../../domain/shipping-rate.entity';

export class GetShippingRateUseCase {
  constructor(private readonly shippingRateRepository: IShippingRateRepository) {}

  async execute(id: string): Promise<Result<ShippingRate, HttpError>> {
    const shippingRate = await this.shippingRateRepository.findById(id);
    if (!shippingRate) {
      return failure(HttpError.notFound('Shipping rate not found.'));
    }

    return success(shippingRate);
  }
}
