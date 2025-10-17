import { IsString, IsNumber } from 'class-validator';

export class CreateDeliveryStatusDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  display_order: number;
}