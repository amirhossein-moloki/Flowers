import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateDeliveryStatusDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  display_order?: number;
}