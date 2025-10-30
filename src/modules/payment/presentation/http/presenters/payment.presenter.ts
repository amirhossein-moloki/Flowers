import { PaymentDto } from '@/modules/payment/application/dtos/payment.dto';

export class PaymentPresenter {
  static toJSON(payment: PaymentDto) {
    return {
      id: payment.id,
      order_id: payment.order_id,
      method: payment.method,
      status: payment.status.toLowerCase(),
      gateway: payment.gateway,
      gateway_ref: payment.gateway_ref,
      amount: payment.amount,
      paid_at: payment.paid_at,
      created_at: payment.created_at,
    };
  }
}
