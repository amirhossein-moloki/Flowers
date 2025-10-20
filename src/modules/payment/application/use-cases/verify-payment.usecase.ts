import { IPaymentRepository } from '../../domain/payment.repository';
import { PaymentDto } from '../dtos/payment.dto';
import { VerifyPaymentDto } from '../dtos/verify-payment.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { PaymentMapper } from '../../infrastructure/payment.mapper';
import { PaymentStatus } from '@/core/domain/enums';

export class VerifyPaymentUseCase {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(dto: VerifyPaymentDto): Promise<Result<PaymentDto, HttpError>> {
    const payment = await this.paymentRepository.findById(dto.paymentId);

    if (!payment) {
      return failure(HttpError.notFound('Payment not found.'));
    }

    // In a real app, you would call the payment gateway to verify the payment
    // and get the actual status.
    payment.props.status = PaymentStatus.PAID;

    await this.paymentRepository.save(payment);

    const paymentDto = PaymentMapper.toDto(payment);
    return success(paymentDto);
  }
}
