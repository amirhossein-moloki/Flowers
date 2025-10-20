import { z } from 'zod';
import { CreatePaymentSchema } from '../../presentation/http/dto/create-payment.schema';

export type CreatePaymentDto = z.infer<typeof CreatePaymentSchema>['body'];
