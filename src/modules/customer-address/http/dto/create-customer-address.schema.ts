import { z } from 'zod';

export const createCustomerAddressSchema = z.object({
  address_id: z.string().min(1, 'Address ID is required'),
  is_default: z.boolean().optional(),
  label: z.string().min(1, 'Label is required'),
});

export type CreateCustomerAddressDTO = z.infer<typeof createCustomerAddressSchema>;