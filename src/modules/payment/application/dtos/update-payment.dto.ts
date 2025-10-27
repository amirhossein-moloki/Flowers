import { IsString, IsEnum, IsNumber, IsDate, IsOptional } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '@/core/domain/enums';

export class UpdatePaymentDto {
  @IsOptional()
  @IsString()
  order_id?: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  method?: PaymentMethod;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsString()
  gateway?: string;

  @IsOptional()
  @IsString()
  gateway_ref?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsDate()
  paid_at?: Date;
}