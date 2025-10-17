import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateOrderStatusDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  display_order: number;

  @IsOptional()
  @IsBoolean()
  is_terminal?: boolean;
}