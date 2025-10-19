export interface ShippingRateDto {
  id: string;
  service_zone_id: string;
  rate: number;
  currency: string;
  weight_unit: string;
  min_weight: number;
  max_weight: number;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
