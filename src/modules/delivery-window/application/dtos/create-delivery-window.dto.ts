import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDeliveryWindowDto {
  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  start_time?: string;

  @IsString()
  @IsOptional()
  end_time?: string;

  @IsString()
  @IsOptional()
  cutoff_time?: string;

  @IsString()
  @IsOptional()
  zone_id?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
