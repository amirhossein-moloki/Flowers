import { INotificationRepository } from '../../domain/notification.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/http/http-error';

export class DeleteNotificationUseCase {
  constructor(
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async execute(id: string): Promise<Result<null, HttpError>> {
    const result = await this.notificationRepository.findById(id);

    if (result.isSuccess()) {
      if (!result.value) {
        return failure(HttpError.notFound('Notification not found.'));
      }

      await this.notificationRepository.delete(id);

      return success(null);
    } else {
      return result;
    }
  }
}
