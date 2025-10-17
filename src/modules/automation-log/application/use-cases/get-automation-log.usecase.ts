import { IAutomationLogRepository } from '../../domain/automation-log.repository';
import { AutomationLogDto } from '../dtos/automation-log.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { AutomationLogMapper } from '../../infrastructure/automation-log.mapper';

export class GetAutomationLogUseCase {
  constructor(private readonly automationLogRepository: IAutomationLogRepository) {}

  async execute(id: string): Promise<Result<AutomationLogDto, HttpError>> {
    const automationLog = await this.automationLogRepository.findById(id);

    if (!automationLog) {
      return failure(HttpError.notFound('AutomationLog not found.'));
    }

    const automationLogDto = AutomationLogMapper.toDto(automationLog);
    return success(automationLogDto);
  }
}