import { ShippingRate as PrismaShippingRate } from '@prisma/client';
import { ShippingRate } from '@/modules/shipping-rate/domain/shipping-rate.entity';
import { ShippingRateDto } from '@/modules/shipping-rate/application/dtos/shipping-rate.dto';

export class ShippingRateMapper {
  public static toDomain(raw: PrismaShippingRate): ShippingRate {
    const shippingRateResult = ShippingRate.create(
      {
        service_zone_id: raw.service_zone_id,
        rate: raw.rate,
        currency: raw.currency,
        weight_unit: raw.weight_unit,
        min_weight: raw.min_weight,
        max_weight: raw.max_weight,
        is_active: raw.is_active,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );

    if (!shippingRateResult.success) {
      throw new Error(`Failed to map raw data to ShippingRate entity: ${shippingRateResult.error.message}`);
    }
    return shippingRateResult.value;
  }

  public static toPersistence(shippingRate: ShippingRate) {
    return {
      id: shippingRate.id,
      service_zone_id: shippingRate.props.service_zone_id,
      rate: shippingRate.props.rate,
      currency: shippingRate.props.currency,
      weight_unit: shippingRate.props.weight_unit,
      min_weight: shippingRate.props.min_weight,
      max_weight: shippingRate.props.max_weight,
      is_active: shippingRate.props.is_active,
    };
  }

  public static toDto(shippingRate: ShippingRate): ShippingRateDto {
    return {
      id: shippingRate.id,
      service_zone_id: shippingRate.props.service_zone_id,
      rate: shippingRate.props.rate,
      currency: shippingRate.props.currency,
      weight_unit: shippingRate.props.weight_unit,
      min_weight: shippingRate.props.min_weight,
      max_weight: shippingRate.props.max_weight,
      is_active: shippingRate.props.is_active,
      createdAt: shippingRate.props.createdAt,
      updatedAt: shippingRate.props.updatedAt,
    };
  }
}
