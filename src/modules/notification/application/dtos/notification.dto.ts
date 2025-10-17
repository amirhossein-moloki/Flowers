import { NotificationChannel } from '../../../../../core/domain/enums';

export class NotificationDto {
  id: string;
  user_id: string;
  order_id: string;
  channel: NotificationChannel;
  template: string;
  payload_json: any;
  status: string;
  sent_at: Date;
}