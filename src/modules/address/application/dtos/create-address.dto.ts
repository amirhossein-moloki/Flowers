import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  formatted: string;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsString()
  postal_code: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;

  @IsOptional()
  @IsObject()
  extra?: any;
}