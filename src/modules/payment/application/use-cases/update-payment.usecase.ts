import { IPaymentRepository } from '../../domain/payment.repository';
import { UpdatePaymentDto } from '../dtos/update-payment.dto';
import { PaymentDto } from '../dtos/payment.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { PaymentMapper } from '../../infrastructure/payment.mapper';
import { Payment } from '../../domain/payment.entity';

export class UpdatePaymentUseCase {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(id: string, dto: UpdatePaymentDto): Promise<Result<PaymentDto, HttpError>> {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      return failure(HttpError.notFound('Payment not found.'));
    }

    const updatedPaymentProps = { ...payment.props, ...dto };
    const updatedPaymentResult = Payment.create(updatedPaymentProps, payment.id);

    if(!updatedPaymentResult.success){
        return failure(HttpError.internalServerError(updatedPaymentResult.error.message));
    }

    const updatedPayment = updatedPaymentResult.value;

    await this.paymentRepository.save(updatedPayment);

    const paymentDto = PaymentMapper.toDto(updatedPayment);
    return success(paymentDto);
  }
}