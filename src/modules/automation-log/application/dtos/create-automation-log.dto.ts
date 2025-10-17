import { IsString, IsDate } from 'class-validator';

export class CreateAutomationLogDto {
  @IsString()
  order_id: string;

  @IsString()
  action: string;

  @IsString()
  status: string;

  @IsString()
  message: string;

  @IsDate()
  executed_at: Date;
}