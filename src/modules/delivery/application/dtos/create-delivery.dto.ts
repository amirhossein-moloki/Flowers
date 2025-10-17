import { IsString, IsEnum, IsDate, IsNumber, IsOptional } from 'class-validator';
import { VehicleType } from '../../../../../core/domain/enums';

export class CreateDeliveryDto {
  @IsString()
  order_id: string;

  @IsString()
  courier_id: string;

  @IsString()
  status_id: string;

  @IsEnum(VehicleType)
  vehicle_type: VehicleType;

  @IsDate()
  assigned_at: Date;

  @IsOptional()
  @IsDate()
  pickup_at?: Date;

  @IsOptional()
  @IsDate()
  dropoff_at?: Date;

  @IsNumber()
  distance_meters: number;

  @IsNumber()
  eta_seconds: number;

  @IsOptional()
  @IsString()
  failure_reason?: string;
}