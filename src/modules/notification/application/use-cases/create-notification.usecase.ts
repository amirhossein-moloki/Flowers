import { INotificationRepository } from '../../domain/notification.repository';
import { Notification } from '../../domain/notification.entity';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationDto } from '../dtos/notification.dto';
import { Result, success, failure } from '../../../../core/utils/result';
import { HttpError } from '../../../../core/errors/http-error';
import { NotificationMapper } from '../../infrastructure/notification.mapper';

export class CreateNotificationUseCase {
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(dto: CreateNotificationDto): Promise<Result<NotificationDto, HttpError>> {
    const notificationResult = Notification.create(dto);

    if (!notificationResult.success) {
      return failure(HttpError.internalServerError(notificationResult.error.message));
    }

    const notification = notificationResult.value;

    await this.notificationRepository.save(notification);

    const notificationDto = NotificationMapper.toDto(notification);
    return success(notificationDto);
  }
}