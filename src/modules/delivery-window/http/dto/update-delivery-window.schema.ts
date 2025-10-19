import { z } from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const updateDeliveryWindowSchema = z.object({
  body: z
    .object({
      label: z.string().min(1, 'Label is required').optional(),
      start_time: z.string().regex(timeRegex, 'Invalid start time format (HH:mm)').optional(),
      end_time: z.string().regex(timeRegex, 'Invalid end time format (HH:mm)').optional(),
      cutoff_time: z.string().regex(timeRegex, 'Invalid cutoff time format (HH:mm)').optional(),
      zone_id: z.string().uuid('Invalid zone ID').optional(),
      is_active: z.boolean().optional(),
    })
    .refine(
      (data) => {
        if (data.start_time && data.end_time) {
          return data.start_time < data.end_time;
        }
        return true;
      },
      {
        message: 'Start time must be before end time',
        path: ['start_time', 'end_time'],
      },
    ),
});

export type UpdateDeliveryWindowDTO = z.infer<typeof updateDeliveryWindowSchema>['body'];