import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class UpdateAddressDto {
  @IsOptional()
  @IsString()
  formatted?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  postal_code?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;

  @IsOptional()
  @IsObject()
  extra?: any;
}