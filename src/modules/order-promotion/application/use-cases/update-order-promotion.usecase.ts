import { IOrderPromotionRepository } from '../../domain/order-promotion.repository';
import { UpdateOrderPromotionDto } from '../dtos/update-order-promotion.dto';
import { OrderPromotionDto } from '../dtos/order-promotion.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { OrderPromotionMapper } from '../../infrastructure/order-promotion.mapper';
import { OrderPromotion } from '../../domain/order-promotion.entity';

export class UpdateOrderPromotionUseCase {
  constructor(private readonly orderPromotionRepository: IOrderPromotionRepository) {}

  async execute(id: string, dto: UpdateOrderPromotionDto): Promise<Result<OrderPromotionDto, HttpError>> {
    const orderPromotion = await this.orderPromotionRepository.findById(id);

    if (!orderPromotion) {
      return failure(HttpError.notFound('OrderPromotion not found.'));
    }

    const updatedOrderPromotionProps = { ...orderPromotion.props, ...dto };
    const updatedOrderPromotionResult = OrderPromotion.create(updatedOrderPromotionProps, orderPromotion.id);

    if(!updatedOrderPromotionResult.success){
        return failure(HttpError.internalServerError(updatedOrderPromotionResult.error.message));
    }

    const updatedOrderPromotion = updatedOrderPromotionResult.value;

    await this.orderPromotionRepository.save(updatedOrderPromotion);

    const orderPromotionDto = OrderPromotionMapper.toDto(updatedOrderPromotion);
    return success(orderPromotionDto);
  }
}