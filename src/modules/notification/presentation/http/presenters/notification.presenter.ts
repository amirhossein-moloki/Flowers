import { Notification } from '../../../domain/notification.entity';

export class NotificationPresenter {
  static toJson(notification: Notification) {
    return {
      id: notification.id.toString(),
      title: notification.title,
      message: notification.message,
      recipient: notification.recipient,
      createdAt: notification.createdAt?.toISOString(),
    };
  }
}
