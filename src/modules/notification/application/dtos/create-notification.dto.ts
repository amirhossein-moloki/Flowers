import { IsString, IsEnum, IsObject, IsOptional, IsDate } from 'class-validator';
import { NotificationChannel } from '../../../../../core/domain/enums';

export class CreateNotificationDto {
  @IsString()
  user_id: string;

  @IsString()
  order_id: string;

  @IsEnum(NotificationChannel)
  channel: NotificationChannel;

  @IsString()
  template: string;

  @IsObject()
  payload_json: any;

  @IsOptional()
  @IsString()
  status?: string;

  @IsDate()
  sent_at: Date;
}