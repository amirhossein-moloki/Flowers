import { AutomationLog } from '../../../domain/automation-log.entity';

export class AutomationLogPresenter {
  static toJSON(automationLog: AutomationLog) {
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
