import { INotificationRepository } from '../../domain/notification.repository';
import { NotificationDto } from '../dtos/notification.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { NotificationMapper } from '../../infrastructure/notification.mapper';

export class GetNotificationUseCase {
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(id: string): Promise<Result<NotificationDto, HttpError>> {
    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      return failure(HttpError.notFound('Notification not found.'));
    }

    const notificationDto = NotificationMapper.toDto(notification);
    return success(notificationDto);
  }
}