import { IsString, IsNumber, IsDate, IsBoolean, IsOptional } from 'class-validator';

export class UpdatePromotionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsNumber()
  percent?: number;

  @IsOptional()
  @IsDate()
  starts_at?: Date;

  @IsOptional()
  @IsDate()
  ends_at?: Date;

  @IsOptional()
  @IsNumber()
  usage_limit?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
