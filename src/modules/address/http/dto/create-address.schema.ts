import { z } from 'zod';

export const createAddressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(1, 'Zip code is required'),
  country: z.string().min(1, 'Country is required'),
  isResidential: z.boolean().optional().nullable(),
});

export type CreateAddressDTO = z.infer<typeof createAddressSchema>;