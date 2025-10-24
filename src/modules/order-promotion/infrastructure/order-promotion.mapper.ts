import { OrderPromotion as PrismaOrderPromotion } from '@prisma/client';
import { OrderPromotion } from '@/modules/order-promotion/domain/order-promotion.entity';
import { OrderPromotionDto } from '../application/dtos/order-promotion.dto';

export class OrderPromotionMapper {
  public static toDomain(raw: PrismaOrderPromotion): OrderPromotion {
    const orderPromotionResult = OrderPromotion.create(
      {
        order_id: raw.order_id,
        promotion_id: raw.promotion_id,
        discount_applied: raw.discount_applied,
        created_at: raw.created_at,
      },
      raw.id,
    );

    if (!orderPromotionResult.success) {
      throw new Error(`Failed to map raw data to OrderPromotion entity: ${orderPromotionResult.error.message}`);
    }
    return orderPromotionResult.value;
  }

  public static toPersistence(orderPromotion: OrderPromotion) {
    const props = orderPromotion.props;
    return {
      id: orderPromotion.id,
      order_id: props.order_id,
      promotion_id: props.promotion_id,
      discount_applied: props.discount_applied,
      created_at: props.created_at,
    };
  }

  public static toDto(orderPromotion: OrderPromotion): OrderPromotionDto {
    const props = orderPromotion.props;
    return {
      id: orderPromotion.id,
      order_id: props.order_id,
      promotion_id: props.promotion_id,
      discount_applied: props.discount_applied,
      created_at: props.created_at,
    };
  }
}