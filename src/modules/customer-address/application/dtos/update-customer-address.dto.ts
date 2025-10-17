import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateCustomerAddressDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  address_id?: string;

  @IsOptional()
  @IsBoolean()
  is_default?: boolean;

  @IsOptional()
  @IsString()
  label?: string;
}