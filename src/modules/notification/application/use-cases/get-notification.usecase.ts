import { INotificationRepository } from '../../domain/notification.repository';
import { NotificationDto } from '../dtos/notification.dto';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';
import { NotificationMapper } from '../../infrastructure/notification.mapper';

export class GetNotificationUseCase {
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(id: string): Promise<Result<NotificationDto | null, HttpError>> {
    const result = await this.notificationRepository.findById(id);

    if (result.success) {
      if (!result.value) {
        return success(null);
      }
      const notificationDto = NotificationMapper.toDto(result.value);
      return success(notificationDto);
    } else {
      return result;
    }
  }
}
