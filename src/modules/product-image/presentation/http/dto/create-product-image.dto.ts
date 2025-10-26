import { z } from 'zod';

export const CreateProductImageSchema = z.object({
  productId: z.string(),
  url: z.string().url(),
});

export type CreateProductImageDto = z.infer<typeof CreateProductImageSchema>;
