import { AutomationLog } from './automation-log.entity';

export interface IAutomationLogRepository {
  findById(id: string): Promise<AutomationLog | null>;
  findAll(): Promise<AutomationLog[]>;
  save(automationLog: AutomationLog): Promise<void>;
  delete(id: string): Promise<void>;
}