import { Entity } from '../../../../core/domain/entity';
import { Result, success } from '../../../../core/utils/result';

interface PromotionProps {
  code: string;
  type: string;
  amount: number;
  percent: number;
  starts_at: Date;
  ends_at: Date;
  usage_limit: number;
  is_active?: boolean;
}

export class Promotion extends Entity<PromotionProps> {
  private constructor(props: PromotionProps, id?: string) {
    super(props, id);
  }

  get code(): string {
    return this.props.code;
  }

  get type(): string {
    return this.props.type;
  }

  get amount(): number {
    return this.props.amount;
  }

  get percent(): number {
    return this.props.percent;
  }

  get starts_at(): Date {
    return this.props.starts_at;
  }

  get ends_at(): Date {
    return this.props.ends_at;
  }

  get usage_limit(): number {
    return this.props.usage_limit;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  public static create(
    props: PromotionProps,
    id?: string,
  ): Result<Promotion, Error> {
    const promotion = new Promotion(
      {
        ...props,
        is_active: props.is_active ?? true,
      },
      id,
    );
    return success(promotion);
  }
}