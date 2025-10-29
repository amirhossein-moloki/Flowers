import { VehicleType } from '@prisma/client';

export interface DeliveryDto {
  id: string;
  order_id: string;
  courier_id: string;
  status_id: string;
  vehicle_type: VehicleType;
  assigned_at: Date;
  pickup_at: Date;
  dropoff_at: Date;
  distance_meters: number;
  eta_seconds: number;
  failure_reason: string;
  tracking_number: string;
}
