import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDeliveryWindowDto {
  @IsString()
  label: string;

  @IsString()
  start_time: string;

  @IsString()
  end_time: string;

  @IsString()
  cutoff_time: string;

  @IsString()
  zone_id: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}