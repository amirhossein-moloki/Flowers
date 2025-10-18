import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';
import { DiscountType } from '@prisma/client';

export interface IPromotionProps {
  code: string;
  description?: string;
  discount_type: DiscountType;
  discount_value: number;
  start_date: Date;
  end_date?: Date;
  max_uses?: number;
  uses_count: number;
  is_active: boolean;
}

export class Promotion extends Entity<IPromotionProps> {
  private constructor(props: IPromotionProps, id?: string) {
    super(props, id);
  }

  public static create(props: IPromotionProps, id?: string): Result<Promotion, Error> {
    const promotion = new Promotion(props, id);
    return success(promotion);
  }
}