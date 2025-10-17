import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductImageDto {
  @IsOptional()
  @IsString()
  product_id?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsNumber()
  sort_order?: number;
}