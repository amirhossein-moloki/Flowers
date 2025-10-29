import { Router } from 'express';
import { AutomationLogController } from './automation-log.controller';
import { PrismaAutomationLogRepository } from '../../infrastructure/prisma-automation-log.repository';
import { FindAllAutomationLogsUseCase } from '../../application/use-cases/find-all-automation-logs.usecase';
import { PrismaClient } from '@prisma/client';

const router = Router();

// Dependencies
const prisma = new PrismaClient();
const automationLogRepository = new PrismaAutomationLogRepository(prisma);

// Use Cases
const findAllAutomationLogsUseCase = new FindAllAutomationLogsUseCase(automationLogRepository);

// Controller
const automationLogController = new AutomationLogController(
  findAllAutomationLogsUseCase,
);

router.use('/', automationLogController.router);

export default router;
