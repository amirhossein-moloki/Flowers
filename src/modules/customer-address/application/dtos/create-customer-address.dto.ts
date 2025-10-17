import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateCustomerAddressDto {
  @IsString()
  user_id: string;

  @IsString()
  address_id: string;

  @IsOptional()
  @IsBoolean()
  is_default?: boolean;

  @IsString()
  label: string;
}