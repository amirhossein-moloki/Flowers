import { IsString, IsNumber } from 'class-validator';

export class CreateOrderPromotionDto {
  @IsString()
  order_id: string;

  @IsString()
  promotion_id: string;

  @IsNumber()
  discount_applied: number;

  constructor(
    order_id: string,
    promotion_id: string,
    discount_applied: number,
  ) {
    this.order_id = order_id;
    this.promotion_id = promotion_id;
    this.discount_applied = discount_applied;
  }
}