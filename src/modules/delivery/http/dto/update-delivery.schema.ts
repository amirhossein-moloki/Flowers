import { z } from 'zod';
import { VehicleType } from '@prisma/client';

export const updateDeliverySchema = z.object({
  order_id: z.string().min(1, 'Order ID is required').optional(),
  courier_id: z.string().min(1, 'Courier ID is required').optional(),
  status_id: z.string().min(1, 'Status ID is required').optional(),
  vehicle_type: z.nativeEnum(VehicleType).optional(),
  assigned_at: z.coerce.date().optional(),
  pickup_at: z.coerce.date().optional(),
  dropoff_at: z.coerce.date().optional(),
  distance_meters: z.number().optional(),
  eta_seconds: z.number().optional(),
  failure_reason: z.string().optional(),
});

export type UpdateDeliveryDTO = z.infer<typeof updateDeliverySchema>;