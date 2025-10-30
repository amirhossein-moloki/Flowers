import { PrismaClient } from '@prisma/client';
import { INotificationRepository } from '@/modules/notification/domain/notification.repository';
import { Notification } from '@/modules/notification/domain/notification.entity';
import { NotificationMapper } from '@/modules/notification/infrastructure/notification.mapper';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';

export class PrismaNotificationRepository implements INotificationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Result<Notification | null, HttpError>> {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id },
      });
      return success(notification ? NotificationMapper.toDomain(notification) : null);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async findAll(): Promise<Result<Notification[], HttpError>> {
    try {
      const notifications = await this.prisma.notification.findMany();
      return success(notifications.map(NotificationMapper.toDomain));
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async save(notification: Notification): Promise<Result<Notification, HttpError>> {
    try {
      const data = NotificationMapper.toPersistence(notification);
      const result = await this.prisma.notification.upsert({
        where: { id: notification.id },
        create: data,
        update: data,
      });
      return success(NotificationMapper.toDomain(result));
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }

  async delete(id: string): Promise<Result<null, HttpError>> {
    try {
      await this.prisma.notification.delete({ where: { id } });
      return success(null);
    } catch (error: any) {
      return failure(HttpError.internalServerError(error.message));
    }
  }
}
