import { PrismaClient } from '@prisma/client';
import { INotificationRepository } from '../domain/notification.repository';
import { Notification } from '../domain/notification.entity';
import { NotificationMapper } from './notification.mapper';

export class PrismaNotificationRepository implements INotificationRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    return notification ? NotificationMapper.toDomain(notification) : null;
  }

  async findAll(): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany();
    return notifications.map(NotificationMapper.toDomain);
  }

  async save(notification: Notification): Promise<void> {
    const data = NotificationMapper.toPersistence(notification);
    await this.prisma.notification.upsert({
      where: { id: notification.id },
      create: data,
      update: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notification.delete({ where: { id } });
  }
}