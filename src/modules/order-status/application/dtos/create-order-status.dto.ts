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

  constructor(
    code: string,
    name: string,
    display_order: number,
    is_terminal?: boolean,
  ) {
    this.code = code;
    this.name = name;
    this.display_order = display_order;
    this.is_terminal = is_terminal;
  }
}