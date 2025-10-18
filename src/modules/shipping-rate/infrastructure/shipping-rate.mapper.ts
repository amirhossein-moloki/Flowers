import { ShippingRate as PrismaShippingRate } from '@prisma/client';
import { ShippingRate } from '../domain/shipping-rate.entity';

export class ShippingRateMapper {
  static toDomain(prismaShippingRate: PrismaShippingRate): ShippingRate {
    const shippingRateResult = ShippingRate.create(
      {
        service_zone_id: prismaShippingRate.service_zone_id,
        rate: prismaShippingRate.rate,
        currency: prismaShippingRate.currency,
        weight_unit: prismaShippingRate.weight_unit,
        min_weight: prismaShippingRate.min_weight,
        max_weight: prismaShippingRate.max_weight,
        is_active: prismaShippingRate.is_active,
        createdAt: prismaShippingRate.created_at,
        updatedAt: prismaShippingRate.updated_at,
      },
      prismaShippingRate.id,
    );

    if (!shippingRateResult.success) {
      throw new Error(String(shippingRateResult.error));
    }

    return shippingRateResult.value;
  }

  static toPersistence(shippingRate: ShippingRate) {
    return {
      id: shippingRate.id,
      service_zone_id: shippingRate.service_zone_id,
      rate: shippingRate.rate,
      currency: shippingRate.currency,
      weight_unit: shippingRate.weight_unit,
      min_weight: shippingRate.min_weight,
      max_weight: shippingRate.max_weight,
      is_active: shippingRate.is_active,
    };
  }
}