import { AutomationLog } from '../domain/automation-log.entity';
import { AutomationLogDto } from '../application/dtos/automation-log.dto';

export class AutomationLogMapper {
  static toDto(automationLog: AutomationLog): AutomationLogDto {
    return {
      id: automationLog.id,
      order_id: automationLog.order_id,
      action: automationLog.action,
      status: automationLog.status,
      message: automationLog.message,
      executed_at: automationLog.executed_at,
    };
  }

  static toDomain(dto: AutomationLogDto): AutomationLog {
    const result = AutomationLog.create({
      order_id: dto.order_id,
      action: dto.action,
      status: dto.status,
      message: dto.message,
      executed_at: dto.executed_at,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(automationLog: AutomationLog): any {
    return {
      id: automationLog.id,
      order_id: automationLog.order_id,
      action: automationLog.action,
      status: automationLog.status,
      message: automationLog.message,
      executed_at: automationLog.executed_at,
    };
  }
}