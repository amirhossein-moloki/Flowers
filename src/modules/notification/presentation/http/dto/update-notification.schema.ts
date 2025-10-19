import { z } from 'zod';

export const updateNotificationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    message: z.string().optional(),
    recipient: z.string().optional(),
  }),
});
