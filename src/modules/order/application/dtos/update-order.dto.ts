import { IsString, IsNumber, IsDate, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  customer_id?: string;

  @IsOptional()
  @IsString()
  vendor_id?: string;

  @IsOptional()
  @IsString()
  outlet_id?: string;

  @IsOptional()
  @IsString()
  status_id?: string;

  @IsOptional()
  @IsString()
  customer_address_id?: string;

  @IsOptional()
  @IsString()
  delivery_window_id?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @IsOptional()
  @IsNumber()
  delivery_fee?: number;

  @IsOptional()
  @IsNumber()
  service_fee?: number;

  @IsOptional()
  @IsNumber()
  discount_total?: number;

  @IsOptional()
  @IsNumber()
  tax_total?: number;

  @IsOptional()
  @IsNumber()
  total_payable?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsDate()
  scheduled_at?: Date;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items?: OrderItemDto[];
}