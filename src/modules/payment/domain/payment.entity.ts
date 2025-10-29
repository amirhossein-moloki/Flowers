import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

interface PaymentProps {
  order_id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  gateway: string;
  gateway_ref: string;
  amount: number;
  paid_at?: Date;
  idempotency_key?: string;
  created_at?: Date;
}

export class Payment extends Entity<PaymentProps> {
  private constructor(props: PaymentProps, id?: string) {
    super(props, id);
  }

  get order_id(): string {
    return this.props.order_id;
  }

  get method(): PaymentMethod {
    return this.props.method;
  }

  get status(): PaymentStatus {
    return this.props.status;
  }

  get gateway(): string {
    return this.props.gateway;
  }

  get gateway_ref(): string {
    return this.props.gateway_ref;
  }

  get amount(): number {
    return this.props.amount;
  }

  get paid_at(): Date | undefined {
    return this.props.paid_at;
  }

  get idempotency_key(): string | undefined {
    return this.props.idempotency_key;
  }

  get created_at(): Date | undefined {
    return this.props.created_at;
  }

  public static create(
    props: PaymentProps,
    id?: string,
  ): Result<Payment, Error> {
    const payment = new Payment(props, id);
    return success(payment);
  }
}