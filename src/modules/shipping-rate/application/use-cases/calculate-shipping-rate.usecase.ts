import { IShippingRateRepository } from '../../domain/shipping-rate.repository';
import { CalculateShippingRateDto } from '../dtos/calculate-shipping-rate.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class CalculateShippingRateUseCase {
  constructor(private readonly shippingRateRepository: IShippingRateRepository) {}

  async execute(dto: CalculateShippingRateDto): Promise<Result<number, HttpError>> {
    const shippingRates = await this.shippingRateRepository.findByServiceZoneId(
      dto.service_zone_id,
    );

    if (!shippingRates || shippingRates.length === 0) {
      return failure(HttpError.notFound('No shipping rates found for this service zone.'));
    }

    const applicableRate = shippingRates.find(
      rate => dto.weight >= rate.props.min_weight && dto.weight <= rate.props.max_weight,
    );

    if (!applicableRate) {
      return failure(HttpError.notFound('No applicable shipping rate found for this weight.'));
    }

    return success(applicableRate.props.rate);
  }
}
