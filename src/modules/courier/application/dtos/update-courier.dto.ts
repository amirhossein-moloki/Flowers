import { IsString, IsEnum, IsBoolean, IsOptional, IsDate, IsNumber } from 'class-validator';
import { VehicleType } from '../../../../../core/domain/enums';

export class UpdateCourierDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsEnum(VehicleType)
  vehicle_type?: VehicleType;

  @IsOptional()
  @IsString()
  plate_number?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsDate()
  last_seen_at?: Date;

  @IsOptional()
  @IsNumber()
  current_lat?: number;

  @IsOptional()
  @IsNumber()
  current_lng?: number;
}