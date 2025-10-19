import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createDeliveryWindowSchema = z.object({
  body: z
    .object({
      label: z.string().min(1, 'Label is required'),
      start_time: z.string().regex(timeRegex, 'Invalid start time format (HH:mm)'),
      end_time: z.string().regex(timeRegex, 'Invalid end time format (HH:mm)'),
      cutoff_time: z.string().regex(timeRegex, 'Invalid cutoff time format (HH:mm)'),
      zone_id: z.string().uuid('Invalid zone ID'),
      is_active: z.boolean().optional(),
    })
    .refine((data) => data.start_time < data.end_time, {
      message: 'Start time must be before end time',
      path: ['start_time', 'end_time'],
    }),
});

export type CreateDeliveryWindowDTO = z.infer<typeof createDeliveryWindowSchema>['body'];