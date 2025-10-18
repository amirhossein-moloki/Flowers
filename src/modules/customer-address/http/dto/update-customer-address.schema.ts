import { z } from 'zod';

export const updateCustomerAddressSchema = z.object({
  user_id: z.string().min(1, 'User ID is required').optional(),
  address_id: z.string().min(1, 'Address ID is required').optional(),
  is_default: z.boolean().optional(),
  label: z.string().min(1, 'Label is required').optional(),
});

export type UpdateCustomerAddressDTO = z.infer<typeof updateCustomerAddressSchema>;