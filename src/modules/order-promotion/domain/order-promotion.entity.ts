import { Entity } from '@/core/domain/entity';
import { Result, success } from '@/core/utils/result';

export interface IOrderPromotionProps {
  order_id: string;
  promotion_id: string;
  discount_applied: number;
  created_at: Date;
}

export class OrderPromotion extends Entity<IOrderPromotionProps> {
  private constructor(props: IOrderPromotionProps, id?: string) {
    super(props, id);
  }

  public static create(props: IOrderPromotionProps, id?: string): Result<OrderPromotion, Error> {
    const orderPromotion = new OrderPromotion(props, id);
    return success(orderPromotion);
  }
}