import express from 'express';
import request from 'supertest';
import { mock } from 'jest-mock-extended';
import { AutomationLog } from '@/modules/automation-log/domain/automation-log.entity';
import { success } from '@/core/utils/result';
import { FindAllAutomationLogsUseCase } from '@/modules/automation-log/application/use-cases/find-all-automation-logs.usecase';
import { AutomationLogController } from '../automation-log.controller';
import { createAutomationLogRoutes } from '../automation-log.routes';

// Mock the use cases
const mockFindAllAutomationLogsUseCase = mock<FindAllAutomationLogsUseCase>();

// Instantiate the controller with the mocked use case
const automationLogController = new AutomationLogController(
  mockFindAllAutomationLogsUseCase,
);

// Create the router using the factory function
const automationLogRoutes = createAutomationLogRoutes(automationLogController);

const app = express();
app.use(express.json());
app.use('/automation-logs', automationLogRoutes);

describe('AutomationLogController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const automationLogResult = AutomationLog.create({
    order_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    action: 'test-action',
    status: 'test-status',
    message: 'test-message',
    executed_at: new Date(),
  });

  if (!automationLogResult.success) {
    throw automationLogResult.error;
  }

  const automationLog = automationLogResult.value;

  describe('GET /automation-logs', () => {
    it('should return an array of automation logs and 200', async () => {
      mockFindAllAutomationLogsUseCase.execute.mockResolvedValue(
        success([automationLog]),
      );

      const response = await request(app).get('/automation-logs');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0].order_id).toBe(automationLog.order_id);
    });
  });
});
