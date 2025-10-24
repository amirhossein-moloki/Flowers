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
    const paymentResult = await this.paymentRepository.findById(dto.paymentId);

    if (!paymentResult) {
      return failure(HttpError.notFound('Payment not found.'));
    }

    const payment = paymentResult;

    if (payment.status === PaymentStatus.PAID) {
      return success(PaymentMapper.toDto(payment));
    }

    payment.props.status = PaymentStatus.PAID;
    payment.props.paid_at = new Date();

    await this.paymentRepository.save(payment);

    const paymentDto = PaymentMapper.toDto(payment);
    return success(paymentDto);
  }
}
