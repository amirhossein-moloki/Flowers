import { IShippingRateRepository } from '../../domain/shipping-rate.repository';
import { Result, success } from '@/core/utils/result';
import { ShippingRate } from '../../domain/shipping-rate.entity';

export class ListShippingRatesUseCase {
  constructor(private readonly shippingRateRepository: IShippingRateRepository) {}

  async execute(): Promise<Result<ShippingRate[], void>> {
    const shippingRates = await this.shippingRateRepository.findAll();

    return success(shippingRates);
  }
}
