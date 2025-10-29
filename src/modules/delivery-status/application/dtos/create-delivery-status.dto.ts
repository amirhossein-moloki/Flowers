import { IsString, IsOptional } from 'class-validator';

export class CreateDeliveryStatusDto {
  @IsString()
  delivery_id: string;

  @IsString()
  status: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
