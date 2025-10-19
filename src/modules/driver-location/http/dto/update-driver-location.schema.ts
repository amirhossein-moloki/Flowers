import { z } from 'zod';

export const updateDriverLocationSchema = z.object({
  body: z.object({
    lat: z.number().min(-90, 'Latitude must be at least -90').max(90, 'Latitude must be at most 90').optional(),
    lng: z.number().min(-180, 'Longitude must be at least -180').max(180, 'Longitude must be at most 180').optional(),
    speed_kmh: z.number().min(0, 'Speed must be a non-negative number').optional(),
    heading_deg: z.number().min(0, 'Heading must be between 0 and 360').max(360, 'Heading must be between 0 and 360').optional(),
    recorded_at: z.string().datetime('Invalid date format for recorded_at').optional(),
  }),
});

export type UpdateDriverLocationDTO = z.infer<typeof updateDriverLocationSchema>['body'];
