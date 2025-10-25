import { OrderPromotion } from '../domain/order-promotion.entity';

export class OrderPromotionPresenter {
  static toDTO(orderPromotion: OrderPromotion) {
    return {
      id: orderPromotion.id,
      order_id: orderPromotion.props.order_id,
      promotion_id: orderPromotion.props.promotion_id,
      discount_applied: orderPromotion.props.discount_applied,
    };
  }

  static arrayToDTO(orderPromotions: OrderPromotion[]) {
    return orderPromotions.map((orderPromotion) => this.toDTO(orderPromotion));
  }
}
