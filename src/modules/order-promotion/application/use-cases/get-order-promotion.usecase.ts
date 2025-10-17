import { IOrderPromotionRepository } from '../../domain/order-promotion.repository';
import { OrderPromotionDto } from '../dtos/order-promotion.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { OrderPromotionMapper } from '../../infrastructure/order-promotion.mapper';

export class GetOrderPromotionUseCase {
  constructor(private readonly orderPromotionRepository: IOrderPromotionRepository) {}

  async execute(id: string): Promise<Result<OrderPromotionDto, HttpError>> {
    const orderPromotion = await this.orderPromotionRepository.findById(id);

    if (!orderPromotion) {
      return failure(HttpError.notFound('OrderPromotion not found.'));
    }

    const orderPromotionDto = OrderPromotionMapper.toDto(orderPromotion);
    return success(orderPromotionDto);
  }
}