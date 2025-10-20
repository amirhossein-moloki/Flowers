import { IPaymentRepository } from '../../domain/payment.repository';
import { Payment } from '../../domain/payment.entity';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { PaymentDto } from '../dtos/payment.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { PaymentMapper } from '../../infrastructure/payment.mapper';
import { PaymentStatus, PaymentMethod } from '@/core/domain/enums';

export class CreatePaymentUseCase {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(dto: CreatePaymentDto): Promise<Result<PaymentDto, HttpError>> {
    const paymentResult = Payment.create({
      order_id: dto.orderId,
      amount: dto.amount,
      method: dto.method as PaymentMethod,
      status: PaymentStatus.PENDING,
      gateway: 'test-gateway',
      gateway_ref: 'test-ref',
      paid_at: new Date(),
    });

    if (!paymentResult.success) {
      return failure(HttpError.internalServerError(paymentResult.error.message));
    }

    const payment = paymentResult.value;

    await this.paymentRepository.save(payment);

    const paymentDto = PaymentMapper.toDto(payment);
    return success(paymentDto);
  }
}
