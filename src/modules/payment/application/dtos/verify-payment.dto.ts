import { z } from 'zod';
import { VerifyPaymentSchema } from '../../presentation/http/dto/verify-payment.schema';

export type VerifyPaymentDto = z.infer<typeof VerifyPaymentSchema>['body'];
