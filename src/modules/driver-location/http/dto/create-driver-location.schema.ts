import { z } from 'zod';

export const createDriverLocationSchema = z.object({
  body: z.object({
    delivery_id: z.string().uuid(),
    courier_id: z.string().uuid(),
    lat: z.number(),
    lng: z.number(),
    speed_kmh: z.number(),
    heading_deg: z.number(),
    recorded_at: z.string().datetime(),
  }),
});
