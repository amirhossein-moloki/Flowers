import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaAutomationLogRepository } from '@/modules/automation-log/infrastructure/prisma-automation-log.repository';
import { AutomationLog } from '@/modules/automation-log/domain/automation-log.entity';
import { AutomationLogMapper } from '@/modules/automation-log/infrastructure/automation-log.mapper';

describe('PrismaAutomationLogRepository', () => {
  let repository: PrismaAutomationLogRepository;

  beforeEach(() => {
    repository = new PrismaAutomationLogRepository(prismaMock);
  });

  const automationLogProps = {
    order_id: 'order-123',
    action: 'test-action',
    status: 'success',
    message: 'Test message',
    executed_at: new Date(),
  };
  const automationLogResult = AutomationLog.create(automationLogProps, 'log-id-1');
  if (!automationLogResult.success) {
    throw new Error('Test setup failed: could not create automation log entity');
  }
  const automationLogEntity = automationLogResult.value;

  const prismaAutomationLog = {
    id: automationLogEntity.id,
    ...automationLogProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  test('findById should return an automation log entity when found', async () => {
    prismaMock.automationLog.findUnique.mockResolvedValue(prismaAutomationLog);

    const foundLog = await repository.findById('log-id-1');

    expect(foundLog).toBeInstanceOf(AutomationLog);
    expect(foundLog?.id).toBe('log-id-1');
    expect(prismaMock.automationLog.findUnique).toHaveBeenCalledWith({ where: { id: 'log-id-1' } });
  });

  test('findById should return null when log is not found', async () => {
    prismaMock.automationLog.findUnique.mockResolvedValue(null);

    const foundLog = await repository.findById('non-existent-id');

    expect(foundLog).toBeNull();
  });

  test('findAll should return an array of automation log entities', async () => {
    prismaMock.automationLog.findMany.mockResolvedValue([prismaAutomationLog]);

    const logs = await repository.findAll();

    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(AutomationLog);
    expect(prismaMock.automationLog.findMany).toHaveBeenCalledWith();
  });

  test('save should call upsert on prisma client', async () => {
    await repository.save(automationLogEntity);

    expect(prismaMock.automationLog.upsert).toHaveBeenCalledWith({
      where: { id: automationLogEntity.id },
      create: AutomationLogMapper.toPersistence(automationLogEntity),
      update: AutomationLogMapper.toPersistence(automationLogEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('log-id-1');

    expect(prismaMock.automationLog.delete).toHaveBeenCalledWith({
      where: { id: 'log-id-1' },
    });
  });
});