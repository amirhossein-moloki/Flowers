import { IOrderPromotionRepository } from '../../domain/order-promotion.repository';
import { OrderPromotion } from '../../domain/order-promotion.entity';
import { CreateOrderPromotionDto } from '../dtos/create-order-promotion.dto';
import { OrderPromotionDto } from '../dtos/order-promotion.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { OrderPromotionMapper } from '../../infrastructure/order-promotion.mapper';

export class CreateOrderPromotionUseCase {
  constructor(private readonly orderPromotionRepository: IOrderPromotionRepository) {}

  async execute(dto: CreateOrderPromotionDto): Promise<Result<OrderPromotionDto, HttpError>> {
    const orderPromotionResult = OrderPromotion.create({
      ...dto,
      created_at: new Date(),
    });

    if (orderPromotionResult.isFailure() || !orderPromotionResult.value) {
      return failure(HttpError.internalServerError(orderPromotionResult.error?.message || 'Could not create order promotion'));
    }

    let orderPromotion = orderPromotionResult.value;

    orderPromotion = await this.orderPromotionRepository.save(orderPromotion);

    const orderPromotionDto = OrderPromotionMapper.toDto(orderPromotion);
    return success(orderPromotionDto);
  }
}