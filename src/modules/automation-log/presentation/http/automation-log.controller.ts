import { Request, Response, NextFunction, Router } from 'express';
import { Controller } from '@/core/http/http';
import { FindAllAutomationLogsUseCase } from '../../application/use-cases/find-all-automation-logs.usecase';
import { AutomationLogPresenter } from './presenters/automation-log.presenter';

export class AutomationLogController extends Controller {
  public readonly router: Router;

  constructor(
    private readonly findAllAutomationLogsUseCase: FindAllAutomationLogsUseCase,
  ) {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', this.findAll.bind(this));
  }

  private async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.findAllAutomationLogsUseCase.execute();
      if (result.success) {
        res.status(200).json(result.value.map(AutomationLogPresenter.toJSON));
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }
}
