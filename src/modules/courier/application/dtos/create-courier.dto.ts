import { IsString, IsEnum, IsBoolean, IsOptional, IsDate, IsNumber } from 'class-validator';
import { VehicleType } from '../../../../../core/domain/enums';

export class CreateCourierDto {
  @IsString()
  user_id: string;

  @IsEnum(VehicleType)
  vehicle_type: VehicleType;

  @IsString()
  plate_number: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsDate()
  last_seen_at: Date;

  @IsNumber()
  current_lat: number;

  @IsNumber()
  current_lng: number;
}