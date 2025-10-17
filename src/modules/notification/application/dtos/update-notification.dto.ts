import { IsString, IsEnum, IsObject, IsOptional, IsDate } from 'class-validator';
import { NotificationChannel } from '../../../../../core/domain/enums';

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsOptional()
  @IsString()
  order_id?: string;

  @IsOptional()
  @IsEnum(NotificationChannel)
  channel?: NotificationChannel;

  @IsOptional()
  @IsString()
  template?: string;

  @IsOptional()
  @IsObject()
  payload_json?: any;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDate()
  sent_at?: Date;
}