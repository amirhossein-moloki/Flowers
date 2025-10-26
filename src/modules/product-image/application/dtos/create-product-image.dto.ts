import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductImageDto {
  @IsString()
  product_id: string;

  @IsString()
  url: string;

  @IsOptional()
  @IsNumber()
  sort_order?: number;

  constructor(product_id: string, url: string, sort_order?: number) {
    this.product_id = product_id;
    this.url = url;
    this.sort_order = sort_order;
  }
}