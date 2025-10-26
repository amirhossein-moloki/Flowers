import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  vendorId!: string;

  @IsString()
  name!: string;

  @IsString()
  sku_code!: string;

  @IsString()
  description!: string;

  @IsNumber()
  price!: number;

  @IsOptional()
  @IsNumber()
  prep_time_min?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsString()
  photo_url!: string;
}
