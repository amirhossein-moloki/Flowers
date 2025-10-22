import { z } from 'zod';

export const updateDriverLocationSchema = z.object({
  body: z.object({
    lat: z.number().optional(),
    lng: z.number().optional(),
    speed_kmh: z.number().optional(),
    heading_deg: z.number().optional(),
    recorded_at: z.string().datetime().optional(),
  }),
});
