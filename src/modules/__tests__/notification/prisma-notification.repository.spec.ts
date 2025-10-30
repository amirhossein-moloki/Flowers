import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaNotificationRepository } from '@/modules/notification/infrastructure/prisma-notification.repository';
import { Notification } from '@/modules/notification/domain/notification.entity';
import { NotificationMapper } from '@/modules/notification/infrastructure/notification.mapper';
import { PrismaClient } from '@prisma/client';

describe('PrismaNotificationRepository', () => {
  let repository: PrismaNotificationRepository;

  beforeEach(() => {
    repository = new PrismaNotificationRepository(prismaMock as unknown as PrismaClient);
  });

  const notificationProps = {
    title: 'Test Notification',
    message: 'This is a test notification.',
    recipient: 'test@example.com',
  };
  const notificationResult = Notification.create(notificationProps, 'notif-id-1');
  if (!notificationResult.success) {
    throw new Error('Test setup failed: could not create notification entity');
  }
  const notificationEntity = notificationResult.value;

  const prismaNotification = {
    id: notificationEntity.id,
    ...notificationProps,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('findById should return a notification entity when found', async () => {
    prismaMock.notification.findUnique.mockResolvedValue(prismaNotification);

    const result = await repository.findById('notif-id-1');

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toBeInstanceOf(Notification);
      expect(result.value?.id).toBe('notif-id-1');
    }
    expect(prismaMock.notification.findUnique).toHaveBeenCalledWith({ where: { id: 'notif-id-1' } });
  });

  test('findAll should return an array of notification entities', async () => {
    prismaMock.notification.findMany.mockResolvedValue([prismaNotification]);

    const result = await repository.findAll();

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toHaveLength(1);
      expect(result.value[0]).toBeInstanceOf(Notification);
    }
    expect(prismaMock.notification.findMany).toHaveBeenCalledWith();
  });

  test('save should call upsert on prisma client', async () => {
    prismaMock.notification.upsert.mockResolvedValue(prismaNotification);
    await repository.save(notificationEntity);

    expect(prismaMock.notification.upsert).toHaveBeenCalledWith({
      where: { id: notificationEntity.id },
      create: NotificationMapper.toPersistence(notificationEntity),
      update: NotificationMapper.toPersistence(notificationEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('notif-id-1');

    expect(prismaMock.notification.delete).toHaveBeenCalledWith({
      where: { id: 'notif-id-1' },
    });
  });
});
