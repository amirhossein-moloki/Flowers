export class PromotionDto {
  id!: string;
  name!: string;
  code!: string;
  description?: string;
  type!: string;
  amount!: number;
  percent!: number;
  starts_at!: Date;
  ends_at!: Date;
  usage_limit!: number;
  is_active!: boolean;
}
