import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface OrderPromotionProps {
  order_id: string;
  promotion_id: string;
  discount_amount: number;
}

export class OrderPromotion extends Entity<OrderPromotionProps> {
  private constructor(props: OrderPromotionProps, id?: string) {
    super(props, id);
  }

  get order_id(): string {
    return this.props.order_id;
  }

  get promotion_id(): string {
    return this.props.promotion_id;
  }

  get discount_amount(): number {
    return this.props.discount_amount;
  }

  public static create(
    props: OrderPromotionProps,
    id?: string,
  ): Result<OrderPromotion, Error> {
    const orderPromotion = new OrderPromotion(props, id);
    return success(orderPromotion);
  }
}