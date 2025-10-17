import { IsString, IsEnum, IsNumber, IsDate } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '../../../../../core/domain/enums';

export class CreatePaymentDto {
  @IsString()
  order_id: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsString()
  gateway: string;

  @IsString()
  gateway_ref: string;

  @IsNumber()
  amount: number;

  @IsDate()
  paid_at: Date;
}