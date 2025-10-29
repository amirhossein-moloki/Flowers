import {
  Payment as PrismaPayment,
  PaymentMethod,
  PaymentStatus,
} from '@prisma/client';
import { Payment } from '@/modules/payment/domain/payment.entity';
import { PaymentDto } from '@/modules/payment/application/dtos/payment.dto';

export class PaymentMapper {
  public static toDomain(raw: PrismaPayment): Payment {
    const paymentResult = Payment.create(
      {
        order_id: raw.order_id,
        method: raw.method,
        status: raw.status,
        gateway: raw.gateway,
        gateway_ref: raw.gateway_ref,
        amount: raw.amount,
        paid_at: raw.paid_at || undefined,
        created_at: raw.created_at,
      },
      raw.id,
    );

    if (!paymentResult.success) {
      throw new Error(`Failed to map raw data to Payment entity: ${paymentResult.error.message}`);
    }
    return paymentResult.value;
  }

  public static toPersistence(payment: Payment) {
    const props = payment.props;
    return {
      id: payment.id,
      order_id: props.order_id,
      method: props.method,
      status: props.status,
      gateway: props.gateway,
      gateway_ref: props.gateway_ref,
      amount: props.amount,
      paid_at: props.paid_at,
      idempotency_key: props.idempotency_key,
    };
  }

  public static toDto(payment: Payment): PaymentDto {
    const props = payment.props;
    if (!payment.created_at) {
      throw new Error('Payment created_at is not defined');
    }
    return {
      id: payment.id,
      order_id: props.order_id,
      method: props.method,
      status: props.status,
      gateway: props.gateway,
      gateway_ref: props.gateway_ref,
      amount: props.amount,
      paid_at: props.paid_at,
      idempotency_key: props.idempotency_key,
      created_at: payment.created_at,
    };
  }
}