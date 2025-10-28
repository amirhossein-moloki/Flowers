import { Router } from 'express';
import { AutomationLogController } from './automation-log.controller';

export function createAutomationLogRoutes(
  automationLogController: AutomationLogController,
): Router {
  const router = Router();
  router.use('/', automationLogController.router);
  return router;
}
