import { z } from 'zod';

export const UpdateProductImageSchema = z.object({
  url: z.string().url().optional(),
});

export type UpdateProductImageDto = z.infer<typeof UpdateProductImageSchema>;
