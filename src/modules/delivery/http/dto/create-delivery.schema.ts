import { z } from 'zod';
import { VehicleType } from '@prisma/client';

export const createDeliverySchema = z.object({
  order_id: z.string().min(1, 'Order ID is required'),
  courier_id: z.string().min(1, 'Courier ID is required'),
  status_id: z.string().min(1, 'Status ID is required'),
  vehicle_type: z.nativeEnum(VehicleType),
  assigned_at: z.coerce.date(),
  pickup_at: z.coerce.date(),
  dropoff_at: z.coerce.date(),
  distance_meters: z.number(),
  eta_seconds: z.number(),
  failure_reason: z.string(),
});

export type CreateDeliveryDTO = z.infer<typeof createDeliverySchema>;