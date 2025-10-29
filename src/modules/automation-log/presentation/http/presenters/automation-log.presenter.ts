import { AutomationLogDto } from '../../../application/dtos/automation-log.dto';

export class AutomationLogPresenter {
  static toJSON(automationLog: AutomationLogDto) {
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
