import { OrderPromotionDto } from '../application/dtos/order-promotion.dto';

export class OrderPromotionPresenter {
  static toDTO(orderPromotion: OrderPromotionDto) {
    return {
      id: orderPromotion.id,
      order_id: orderPromotion.order_id,
      promotion_id: orderPromotion.promotion_id,
      discount_applied: orderPromotion.discount_applied,
    };
  }

  static arrayToDTO(orderPromotions: OrderPromotionDto[]) {
    return orderPromotions.map((orderPromotion) => this.toDTO(orderPromotion));
  }
}
