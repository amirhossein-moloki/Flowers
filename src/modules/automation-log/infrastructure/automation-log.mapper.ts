import { AutomationLog } from '../domain/automation-log.entity';
import { AutomationLog as PrismaAutomationLog } from '@prisma/client';
import { AutomationLogDto } from '../application/dtos/automation-log.dto';

export class AutomationLogMapper {
  public static toDomain(prismaLog: PrismaAutomationLog): AutomationLog {
    const logResult = AutomationLog.create({
      order_id: prismaLog.order_id,
      action: prismaLog.action,
      status: prismaLog.status,
      message: prismaLog.message,
      executed_at: prismaLog.executed_at,
    }, prismaLog.id);

    if (logResult.success) {
      return logResult.value;
    }
    throw new Error(`Could not create domain entity from prisma data: ${logResult.error}`);
  }

  public static toPersistence(log: AutomationLog) {
    return {
      id: log.id,
      order_id: log.order_id,
      action: log.action,
      status: log.status,
      message: log.message,
      executed_at: log.executed_at,
    };
  }

  public static toDto(log: AutomationLog): AutomationLogDto {
    return {
      id: log.id,
      order_id: log.order_id,
      action: log.action,
      status: log.status,
      message: log.message,
      executed_at: log.executed_at,
    };
  }
}
