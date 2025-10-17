import { IAutomationLogRepository } from '../../domain/automation-log.repository';
import { UpdateAutomationLogDto } from '../dtos/update-automation-log.dto';
import { AutomationLogDto } from '../dtos/automation-log.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { AutomationLogMapper } from '../../infrastructure/automation-log.mapper';
import { AutomationLog } from '../../domain/automation-log.entity';

export class UpdateAutomationLogUseCase {
  constructor(private readonly automationLogRepository: IAutomationLogRepository) {}

  async execute(id: string, dto: UpdateAutomationLogDto): Promise<Result<AutomationLogDto, HttpError>> {
    const automationLog = await this.automationLogRepository.findById(id);

    if (!automationLog) {
      return failure(HttpError.notFound('AutomationLog not found.'));
    }

    const updatedAutomationLogProps = { ...automationLog.props, ...dto };
    const updatedAutomationLogResult = AutomationLog.create(updatedAutomationLogProps, automationLog.id);

    if(!updatedAutomationLogResult.success){
        return failure(HttpError.internalServerError(updatedAutomationLogResult.error.message));
    }

    const updatedAutomationLog = updatedAutomationLogResult.value;

    await this.automationLogRepository.save(updatedAutomationLog);

    const automationLogDto = AutomationLogMapper.toDto(updatedAutomationLog);
    return success(automationLogDto);
  }
}