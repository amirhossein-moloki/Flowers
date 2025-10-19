import { z } from 'zod';

export const createDriverLocationSchema = z.object({
  body: z.object({
    delivery_id: z.string().uuid('Invalid delivery ID format'),
    courier_id: z.string().uuid('Invalid courier ID format'),
    lat: z.number().min(-90, 'Latitude must be at least -90').max(90, 'Latitude must be at most 90'),
    lng: z.number().min(-180, 'Longitude must be at least -180').max(180, 'Longitude must be at most 180'),
    speed_kmh: z.number().min(0, 'Speed must be a non-negative number'),
    heading_deg: z.number().min(0, 'Heading must be between 0 and 360').max(360, 'Heading must be between 0 and 360'),
    recorded_at: z.string().datetime('Invalid date format for recorded_at'),
  }),
});

export type CreateDriverLocationDTO = z.infer<typeof createDriverLocationSchema>['body'];
