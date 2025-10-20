import { Router } from 'express';
import { AutomationLogController } from './automation-log.controller';
import { PrismaAutomationLogRepository } from '../../infrastructure/prisma-automation-log.repository';
import { FindAllAutomationLogsUseCase } from '../../application/use-cases/find-all-automation-logs.usecase';

const router = Router();

// Dependencies
const automationLogRepository = new PrismaAutomationLogRepository();

// Use Cases
const findAllAutomationLogsUseCase = new FindAllAutomationLogsUseCase(automationLogRepository);

// Controller
const automationLogController = new AutomationLogController(
  findAllAutomationLogsUseCase,
);

router.use('/automation-logs', automationLogController.router);

export default router;
