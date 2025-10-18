import {
  Notification as PrismaNotification,
  NotificationChannel as PrismaNotificationChannel,
  NotificationStatus as PrismaNotificationStatus,
} from '@prisma/client';
import { Notification } from '@/modules/notification/domain/notification.entity';
import { NotificationDto } from '@/modules/notification/application/dtos/notification.dto';
import { NotificationChannel as DomainNotificationChannel } from '@/core/domain/enums';
import { Prisma } from '@prisma/client';

function toPrismaNotificationChannel(
  channel: DomainNotificationChannel,
): PrismaNotificationChannel {
  switch (channel) {
    case DomainNotificationChannel.EMAIL:
      return PrismaNotificationChannel.EMAIL;
    case DomainNotificationChannel.PUSH:
      return PrismaNotificationChannel.PUSH;
    case DomainNotificationChannel.SMS:
      return PrismaNotificationChannel.SMS;
    case DomainNotificationChannel.IN_APP:
      return PrismaNotificationChannel.IN_APP;
  }
}

function toDomainNotificationChannel(
  channel: PrismaNotificationChannel,
): DomainNotificationChannel {
  switch (channel) {
    case PrismaNotificationChannel.EMAIL:
      return DomainNotificationChannel.EMAIL;
    case PrismaNotificationChannel.PUSH:
      return DomainNotificationChannel.PUSH;
    case PrismaNotificationChannel.SMS:
      return DomainNotificationChannel.SMS;
    case PrismaNotificationChannel.IN_APP:
      return DomainNotificationChannel.IN_APP;
  }
}

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

  static toDomain(prismaNotification: PrismaNotification): Notification {
    const result = Notification.create(
      {
        user_id: prismaNotification.user_id,
        order_id: prismaNotification.order_id,
        channel: toDomainNotificationChannel(prismaNotification.channel),
        template: prismaNotification.template,
        payload_json: prismaNotification.payload_json as any,
        status: prismaNotification.status,
        sent_at: prismaNotification.sent_at,
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
  ): Omit<PrismaNotification, 'createdAt' | 'updatedAt'> {
    return {
      id: notification.id,
      user_id: notification.user_id,
      order_id: notification.order_id,
      channel: toPrismaNotificationChannel(notification.channel),
      template: notification.template,
      payload_json: notification.payload_json as unknown as Prisma.JsonValue,
      status: notification.status as PrismaNotificationStatus,
      sent_at: notification.sent_at,
    };
  }
}