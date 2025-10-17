import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  product_id: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsNumber()
  sort_order?: number;
}