import { INotificationRepository } from '../../domain/notification.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteNotificationUseCase {
  constructor(private readonly notificationRepository: INotificationRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const notification = await this.notificationRepository.findById(id);

    if (!notification) {
      return failure(HttpError.notFound('Notification not found.'));
    }

    await this.notificationRepository.delete(id);

    return success(undefined);
  }
}