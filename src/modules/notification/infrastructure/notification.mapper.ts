import { Notification as PrismaNotification } from '@prisma/client';
import { Notification } from '@/modules/notification/domain/notification.entity';
import { NotificationDto } from '@/modules/notification/application/dtos/notification.dto';

export class NotificationMapper {
  static toDto(notification: Notification): NotificationDto {
    return {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      recipient: notification.recipient,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(prismaNotification: PrismaNotification): Notification {
    const result = Notification.create(
      {
        title: prismaNotification.title,
        message: prismaNotification.message,
        recipient: prismaNotification.recipient,
        createdAt: prismaNotification.createdAt,
      },
      prismaNotification.id,
    );

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(
    notification: Notification,
  ): Omit<PrismaNotification, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      title: notification.title,
      message: notification.message,
      recipient: notification.recipient,
    };
  }
}
