import { INotificationRepository } from '../../domain/notification.repository';
import { UpdateNotificationDto } from '../dtos/update-notification.dto';
import { NotificationDto } from '../dtos/notification.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { NotificationMapper } from '../../infrastructure/notification.mapper';
import { Notification } from '../../domain/notification.entity';

export class UpdateNotificationUseCase {
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(id: string, dto: UpdateNotificationDto): Promise<Result<NotificationDto, HttpError>> {
    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      return failure(HttpError.notFound('Notification not found.'));
    }

    const updatedNotificationProps = { ...notification.props, ...dto };
    const updatedNotificationResult = Notification.create(updatedNotificationProps, notification.id);

    if(!updatedNotificationResult.success){
        return failure(HttpError.internalServerError(updatedNotificationResult.error.message));
    }

    const updatedNotification = updatedNotificationResult.value;

    await this.notificationRepository.save(updatedNotification);

    const notificationDto = NotificationMapper.toDto(updatedNotification);
    return success(notificationDto);
  }
}