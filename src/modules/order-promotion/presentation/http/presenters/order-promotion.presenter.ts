import { OrderPromotionDto } from '@/modules/order-promotion/application/dtos/order-promotion.dto';

export class OrderPromotionPresenter {
  static toHTTP(orderPromotion: OrderPromotionDto) {
    return {
      id: orderPromotion.id,
      order_id: orderPromotion.order_id,
      promotion_id: orderPromotion.promotion_id,
      discount_applied: orderPromotion.discount_applied,
      created_at: orderPromotion.created_at,
    };
  }
}
