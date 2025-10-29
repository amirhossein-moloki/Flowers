import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateDriverLocationDto {
  @IsString()
  delivery_id?: string;

  @IsString()
  courier_id?: string;

  @IsNumber()
  lat?: number;

  @IsNumber()
  lng?: number;

  @IsNumber()
  @IsOptional()
  speed_kmh?: number;

  @IsNumber()
  @IsOptional()
  heading_deg?: number;

  @IsDate()
  recorded_at?: Date;
}
