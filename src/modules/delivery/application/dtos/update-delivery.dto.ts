import { IsString, IsEnum, IsDate, IsNumber, IsOptional } from 'class-validator';
import { VehicleType } from '../../../../../core/domain/enums';

export class UpdateDeliveryDto {
  @IsOptional()
  @IsString()
  order_id?: string;

  @IsOptional()
  @IsString()
  courier_id?: string;

  @IsOptional()
  @IsString()
  status_id?: string;

  @IsOptional()
  @IsEnum(VehicleType)
  vehicle_type?: VehicleType;

  @IsOptional()
  @IsDate()
  assigned_at?: Date;

  @IsOptional()
  @IsDate()
  pickup_at?: Date;

  @IsOptional()
  @IsDate()
  dropoff_at?: Date;

  @IsOptional()
  @IsNumber()
  distance_meters?: number;

  @IsOptional()
  @IsNumber()
  eta_seconds?: number;

  @IsOptional()
  @IsString()
  failure_reason?: string;
}