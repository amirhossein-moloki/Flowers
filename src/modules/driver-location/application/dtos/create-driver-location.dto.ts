import { IsString, IsNumber, IsDate } from 'class-validator';

export class CreateDriverLocationDto {
  @IsString()
  delivery_id: string;

  @IsString()
  courier_id: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsNumber()
  speed_kmh: number;

  @IsNumber()
  heading_deg: number;

  @IsDate()
  recorded_at: Date;
}