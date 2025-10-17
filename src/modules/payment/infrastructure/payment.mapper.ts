import { Payment } from '../domain/payment.entity';
import { PaymentDto } from '../application/dtos/payment.dto';

export class PaymentMapper {
  static toDto(payment: Payment): PaymentDto {
    return {
      id: payment.id,
      order_id: payment.order_id,
      method: payment.method,
      status: payment.status,
      gateway: payment.gateway,
      gateway_ref: payment.gateway_ref,
      amount: payment.amount,
      paid_at: payment.paid_at,
    };
  }

  static toDomain(dto: PaymentDto): Payment {
    const result = Payment.create({
      order_id: dto.order_id,
      method: dto.method,
      status: dto.status,
      gateway: dto.gateway,
      gateway_ref: dto.gateway_ref,
      amount: dto.amount,
      paid_at: dto.paid_at,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(payment: Payment): any {
    return {
      id: payment.id,
      order_id: payment.order_id,
      method: payment.method,
      status: payment.status,
      gateway: payment.gateway,
      gateway_ref: payment.gateway_ref,
      amount: payment.amount,
      paid_at: payment.paid_at,
    };
  }
}