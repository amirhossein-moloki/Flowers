import { IPaymentRepository } from '../../domain/payment.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class DeletePaymentUseCase {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const payment = await this.paymentRepository.findById(id);

    if (!payment) {
      return failure(HttpError.notFound('Payment not found.'));
    }

    await this.paymentRepository.delete(id);

    return success(undefined);
  }
}