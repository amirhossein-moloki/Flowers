import { IShippingRateRepository } from '../../domain/shipping-rate.repository';
import { ShippingRate, IShippingRateProps } from '../../domain/shipping-rate.entity';
import { CreateShippingRateDto } from '../dtos/create-shipping-rate.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class CreateShippingRateUseCase {
  constructor(private readonly shippingRateRepository: IShippingRateRepository) {}

  async execute(dto: CreateShippingRateDto): Promise<Result<ShippingRate, HttpError>> {
    const shippingRateProps: IShippingRateProps = { ...dto };
    const shippingRateResult = ShippingRate.create(shippingRateProps, dto.id);

    if (!shippingRateResult.success) {
      return failure(HttpError.internalServerError(shippingRateResult.error.message));
    }
    const shippingRate = shippingRateResult.value;

    await this.shippingRateRepository.save(shippingRate);

    return success(shippingRate);
  }
}
