import { OrderPromotion } from '../domain/order-promotion.entity';
import { OrderPromotionDto } from '../application/dtos/order-promotion.dto';

export class OrderPromotionMapper {
  static toDto(orderPromotion: OrderPromotion): OrderPromotionDto {
    return {
      id: orderPromotion.id,
      order_id: orderPromotion.order_id,
      promotion_id: orderPromotion.promotion_id,
      discount_amount: orderPromotion.discount_amount,
    };
  }

  static toDomain(dto: OrderPromotionDto): OrderPromotion {
    const result = OrderPromotion.create({
      order_id: dto.order_id,
      promotion_id: dto.promotion_id,
      discount_amount: dto.discount_amount,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(orderPromotion: OrderPromotion): any {
    return {
      id: orderPromotion.id,
      order_id: orderPromotion.order_id,
      promotion_id: orderPromotion.promotion_id,
      discount_amount: orderPromotion.discount_amount,
    };
  }
}