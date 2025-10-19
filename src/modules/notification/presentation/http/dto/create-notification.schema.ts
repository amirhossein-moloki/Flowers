import { z } from 'zod';

export const createNotificationSchema = z.object({
  body: z.object({
    title: z.string(),
    message: z.string(),
    recipient: z.string(),
  }),
});
