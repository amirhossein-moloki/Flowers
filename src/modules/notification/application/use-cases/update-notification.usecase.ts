import { INotificationRepository } from '../../domain/notification.repository';
import { UpdateNotificationDto } from '../dtos/update-notification.dto';
import { NotificationDto } from '../dtos/notification.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';
import { NotificationMapper } from '../../infrastructure/notification.mapper';
import { Notification } from '../../domain/notification.entity';

export class UpdateNotificationUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async execute(
    id: string,
    dto: UpdateNotificationDto,
  ): Promise<Result<NotificationDto, HttpError>> {
    const result = await this.notificationRepository.findById(id);

    if (result.isSuccess()) {
      if (!result.value) {
        return failure(HttpError.notFound('Notification not found.'));
      }

      const updatedNotificationProps = { ...result.value.props, ...dto };
      const updatedNotificationResult = Notification.create(
        updatedNotificationProps,
        result.value.id,
      );

      if (updatedNotificationResult.isFailure()) {
        return failure(
          HttpError.internalServerError(
            updatedNotificationResult.error.message,
          ),
        );
      }

      const updatedNotification = updatedNotificationResult.value;

      await this.notificationRepository.save(updatedNotification);

      const notificationDto = NotificationMapper.toDto(updatedNotification);
      return success(notificationDto);
    } else {
      return result;
    }
  }
}
