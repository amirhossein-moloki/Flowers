import { IAutomationLogRepository } from '@/modules/automation-log/domain/automation-log.repository';
import { AutomationLog } from '@/modules/automation-log/domain/automation-log.entity';
import { PrismaClient } from '@prisma/client';
import { AutomationLogMapper } from '@/modules/automation-log/infrastructure/automation-log.mapper';

export class PrismaAutomationLogRepository implements IAutomationLogRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<AutomationLog | null> {
    const automationLog = await this.prisma.automationLog.findUnique({ where: { id } });
    return automationLog ? AutomationLogMapper.toDomain(automationLog) : null;
  }

  async findAll(): Promise<AutomationLog[]> {
    const automationLogs = await this.prisma.automationLog.findMany();
    return automationLogs.map(AutomationLogMapper.toDomain);
  }

  async save(automationLog: AutomationLog): Promise<void> {
    const data = AutomationLogMapper.toPersistence(automationLog);
    await this.prisma.automationLog.upsert({
      where: { id: automationLog.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.automationLog.delete({ where: { id } });
  }
}
