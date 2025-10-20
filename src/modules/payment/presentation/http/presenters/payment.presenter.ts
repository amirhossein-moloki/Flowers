import { Payment } from '../../../domain/payment.entity';

export class PaymentPresenter {
  static toJSON(payment: Payment) {
    return {
      id: payment.id,
      order_id: payment.order_id,
      method: payment.method,
      status: payment.status,
      gateway: payment.gateway,
      gateway_ref: payment.gateway_ref,
      amount: payment.amount,
      paid_at: payment.paid_at,
      created_at: payment.props.created_at,
    };
  }
}
