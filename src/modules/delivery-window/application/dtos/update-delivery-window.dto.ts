import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateDeliveryWindowDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  start_time?: string;

  @IsOptional()
  @IsString()
  end_time?: string;

  @IsOptional()
  @IsString()
  cutoff_time?: string;

  @IsOptional()
  @IsString()
  zone_id?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}