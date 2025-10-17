import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateAutomationLogDto {
  @IsOptional()
  @IsString()
  order_id?: string;

  @IsOptional()
  @IsString()
  action?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsDate()
  executed_at?: Date;
}