import { PaymentMethod, PaymentStatus } from '@/core/domain/enums';

export class PaymentDto {
  id: string;
  order_id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  gateway: string;
  gateway_ref: string;
  amount: number;
  paid_at?: Date;
  idempotency_key?: string;
  created_at: Date;

  constructor(
    id: string,
    order_id: string,
    method: PaymentMethod,
    status: PaymentStatus,
    gateway: string,
    gateway_ref: string,
    amount: number,
    created_at: Date,
    paid_at?: Date,
    idempotency_key?: string,
  ) {
    this.id = id;
    this.order_id = order_id;
    this.method = method;
    this.status = status;
    this.gateway = gateway;
    this.gateway_ref = gateway_ref;
    this.amount = amount;
    this.paid_at = paid_at;
    this.idempotency_key = idempotency_key;
    this.created_at = created_at;
  }
}
