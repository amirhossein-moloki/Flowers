import { IPaymentRepository } from '../../domain/payment.repository';
import { Payment } from '../../domain/payment.entity';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { PaymentDto } from '../dtos/payment.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { PaymentMapper } from '../../infrastructure/payment.mapper';

export class CreatePaymentUseCase {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(dto: CreatePaymentDto): Promise<Result<PaymentDto, HttpError>> {
    const paymentResult = Payment.create(dto);

    if (!paymentResult.success) {
      return failure(HttpError.internalServerError(paymentResult.error.message));
    }

    const payment = paymentResult.value;

    await this.paymentRepository.save(payment);

    const paymentDto = PaymentMapper.toDto(payment);
    return success(paymentDto);
  }
}