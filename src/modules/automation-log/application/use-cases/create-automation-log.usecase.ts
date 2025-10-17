import { IAutomationLogRepository } from '../../domain/automation-log.repository';
import { AutomationLog } from '../../domain/automation-log.entity';
import { CreateAutomationLogDto } from '../dtos/create-automation-log.dto';
import { AutomationLogDto } from '../dtos/automation-log.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { AutomationLogMapper } from '../../infrastructure/automation-log.mapper';

export class CreateAutomationLogUseCase {
  constructor(private readonly automationLogRepository: IAutomationLogRepository) {}

  async execute(dto: CreateAutomationLogDto): Promise<Result<AutomationLogDto, HttpError>> {
    const automationLogResult = AutomationLog.create(dto);

    if (!automationLogResult.success) {
      return failure(HttpError.internalServerError(automationLogResult.error.message));
    }

    const automationLog = automationLogResult.value;

    await this.automationLogRepository.save(automationLog);

    const automationLogDto = AutomationLogMapper.toDto(automationLog);
    return success(automationLogDto);
  }
}