import { ShippingRate } from '@/modules/shipping-rate/domain/shipping-rate.entity';

export class ShippingRatePresenter {
  static toHTTP(shippingRate: ShippingRate) {
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
