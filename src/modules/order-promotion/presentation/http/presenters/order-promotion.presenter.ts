import { OrderPromotion } from '@/modules/order-promotion/domain/order-promotion.entity';

export class OrderPromotionPresenter {
  static toHTTP(orderPromotion: OrderPromotion) {
    return {
      id: orderPromotion.id,
      order_id: orderPromotion.props.order_id,
      promotion_id: orderPromotion.props.promotion_id,
      discount_applied: orderPromotion.props.discount_applied,
      created_at: orderPromotion.props.created_at,
    };
  }
}
