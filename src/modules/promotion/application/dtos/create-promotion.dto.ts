import { IsString, IsNumber, IsDate, IsBoolean, IsOptional } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  code: string;

  @IsString()
  type: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  percent: number;

  @IsDate()
  starts_at: Date;

  @IsDate()
  ends_at: Date;

  @IsNumber()
  usage_limit: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}