import { IAutomationLogRepository } from '../../domain/automation-log.repository';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

export class DeleteAutomationLogUseCase {
  constructor(private readonly automationLogRepository: IAutomationLogRepository) {}

  async execute(id: string): Promise<Result<void, HttpError>> {
    const automationLog = await this.automationLogRepository.findById(id);

    if (!automationLog) {
      return failure(HttpError.notFound('AutomationLog not found.'));
    }

    await this.automationLogRepository.delete(id);

    return success(undefined);
  }
}