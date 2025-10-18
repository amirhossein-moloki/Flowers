import { z } from 'zod';

export const updateAddressSchema = z.object({
  street: z.string().min(1, 'Street is required').optional(),
  city: z.string().min(1, 'City is required').optional(),
  state: z.string().min(1, 'State is required').optional(),
  zipCode: z.string().min(1, 'Zip code is required').optional(),
  country: z.string().min(1, 'Country is required').optional(),
  isResidential: z.boolean().optional().nullable(),
});

export type UpdateAddressDTO = z.infer<typeof updateAddressSchema>;