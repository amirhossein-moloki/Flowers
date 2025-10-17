import { Notification } from '../domain/notification.entity';
import { NotificationDto } from '../application/dtos/notification.dto';

export class NotificationMapper {
  static toDto(notification: Notification): NotificationDto {
    return {
      id: notification.id,
      user_id: notification.user_id,
      order_id: notification.order_id,
      channel: notification.channel,
      template: notification.template,
      payload_json: notification.payload_json,
      status: notification.status,
      sent_at: notification.sent_at,
    };
  }

  static toDomain(dto: NotificationDto): Notification {
    const result = Notification.create({
      user_id: dto.user_id,
      order_id: dto.order_id,
      channel: dto.channel,
      template: dto.template,
      payload_json: dto.payload_json,
      status: dto.status,
      sent_at: dto.sent_at,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(notification: Notification): any {
    return {
      id: notification.id,
      user_id: notification.user_id,
      order_id: notification.order_id,
      channel: notification.channel,
      template: notification.template,
      payload_json: notification.payload_json,
      status: notification.status,
      sent_at: notification.sent_at,
    };
  }
}