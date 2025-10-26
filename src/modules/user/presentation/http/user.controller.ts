import { Request, Response, NextFunction, Router } from 'express';
import { Controller } from '@/core/http/http';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { validate } from '@/core/middlewares/validate.middleware';
import { CreateUserSchema } from '../../application/dtos/create-user.dto';

export class UserController extends Controller {
  public readonly router: Router;

  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
  ) {
    super();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      '/',
      validate(CreateUserSchema),
      this.createUser.bind(this),
    );
    this.router.get('/:id', this.getUser.bind(this));
  }

  private async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.createUserUseCase.execute(req.body);
      if (result.success) {
        res.status(201).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.getUserUseCase.execute(id);
      if (result.success) {
        res.status(200).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }
}