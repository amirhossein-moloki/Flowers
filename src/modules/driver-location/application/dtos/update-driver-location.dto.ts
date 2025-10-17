import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class UpdateDriverLocationDto {
  @IsOptional()
  @IsString()
  delivery_id?: string;

  @IsOptional()
  @IsString()
  courier_id?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsOptional()
  @IsNumber()
  speed_kmh?: number;

  @IsOptional()
  @IsNumber()
  heading_deg?: number;

  @IsOptional()
  @IsDate()
  recorded_at?: Date;
}