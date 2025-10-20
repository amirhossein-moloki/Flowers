import { PaymentMethod, PaymentStatus } from '@/core/domain/enums';

export class PaymentDto {
  id: string;
  order_id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  gateway: string;
  gateway_ref: string;
  amount: number;
  paid_at: Date;
  created_at: Date;
}
