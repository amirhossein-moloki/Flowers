import { IAutomationLogRepository } from '../../domain/automation-log.repository';
import { AutomationLogDto } from '../dtos/automation-log.dto';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { AutomationLogMapper } from '../../infrastructure/automation-log.mapper';

export class FindAllAutomationLogsUseCase {
  constructor(private readonly automationLogRepository: IAutomationLogRepository) {}

  async execute(): Promise<Result<AutomationLogDto[], HttpError>> {
    const automationLogs = await this.automationLogRepository.findAll();
    const automationLogDtos = automationLogs.map(AutomationLogMapper.toDto);
    return success(automationLogDtos);
  }
}
