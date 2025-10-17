import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderPromotionDto {
  @IsOptional()
  @IsString()
  order_id?: string;

  @IsOptional()
  @IsString()
  promotion_id?: string;

  @IsOptional()
  @IsNumber()
  discount_amount?: number;
}