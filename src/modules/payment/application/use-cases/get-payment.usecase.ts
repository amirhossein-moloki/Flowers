import { IPaymentRepository } from '../../domain/payment.repository';
import { PaymentDto } from '../dtos/payment.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { PaymentMapper } from '../../infrastructure/payment.mapper';

export class GetPaymentUseCase {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(id: string): Promise<Result<PaymentDto, HttpError>> {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      return failure(HttpError.notFound('Payment not found.'));
    }

    const paymentDto = PaymentMapper.toDto(payment);
    return success(paymentDto);
  }
}