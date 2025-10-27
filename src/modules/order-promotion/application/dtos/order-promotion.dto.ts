export class OrderPromotionDto {
  id: string;
  order_id: string;
  promotion_id: string;
  discount_applied: number;
  created_at: Date;

  constructor(
    id: string,
    order_id: string,
    promotion_id: string,
    discount_applied: number,
    created_at: Date,
  ) {
    this.id = id;
    this.order_id = order_id;
    this.promotion_id = promotion_id;
    this.discount_applied = discount_applied;
    this.created_at = created_at;
  }
}