import { IShippingRateRepository } from '../../domain/shipping-rate.repository';
import { UpdateShippingRateDto } from '../dtos/update-shipping-rate.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { ShippingRate } from '../../domain/shipping-rate.entity';

export class UpdateShippingRateUseCase {
  constructor(private readonly shippingRateRepository: IShippingRateRepository) {}

  async execute(id: string, dto: UpdateShippingRateDto): Promise<Result<ShippingRate, HttpError>> {
    const existingShippingRate = await this.shippingRateRepository.findById(id);
    if (!existingShippingRate) {
      return failure(HttpError.notFound('Shipping rate not found.'));
    }

    const updatedProps = { ...existingShippingRate.props, ...dto };
    const updatedShippingRateResult = existingShippingRate.update(updatedProps);

    if (updatedShippingRateResult.isFailure()) {
      return failure(HttpError.internalServerError(updatedShippingRateResult.error?.message));
    }

    const updatedShippingRate = updatedShippingRateResult.value;
    if (!updatedShippingRate) {
      return failure(HttpError.internalServerError('Failed to update shipping rate'));
    }

    await this.shippingRateRepository.update(updatedShippingRate);

    return success(updatedShippingRate);
  }
}
