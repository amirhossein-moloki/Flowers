import { IOrderPromotionRepository } from '../../domain/order-promotion.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteOrderPromotionUseCase {
  constructor(private readonly orderPromotionRepository: IOrderPromotionRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const orderPromotion = await this.orderPromotionRepository.findById(id);

    if (!orderPromotion) {
      return failure(HttpError.notFound('OrderPromotion not found.'));
    }

    await this.orderPromotionRepository.delete(id);

    return success(undefined);
  }
}