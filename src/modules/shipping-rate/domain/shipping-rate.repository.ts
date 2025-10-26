import { ShippingRate } from './shipping-rate.entity';

export interface IShippingRateRepository {
  findById(id: string): Promise<ShippingRate | null>;
  findByServiceZoneId(serviceZoneId: string): Promise<ShippingRate[]>;
  findAll(): Promise<ShippingRate[]>;
  save(shippingRate: ShippingRate): Promise<ShippingRate>;
  update(shippingRate: ShippingRate): Promise<ShippingRate>;
  delete(id: string): Promise<boolean>;
}