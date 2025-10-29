import { Request, Response, NextFunction, Router } from 'express';
import { Controller } from '@/core/http/http';
import { CreateUserUseCase } from '../../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../../application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.usecase';
import { ListUsersUseCase } from '../../application/use-cases/list-users.usecase';
import { validate } from '@/core/middlewares/validate.middleware';
import { CreateUserSchema } from '../../application/dtos/create-user.dto';
import { UpdateUserSchema } from '../../application/dtos/update-user.dto';

export interface UserControllerDependencies {
  createUserUseCase: CreateUserUseCase;
  getUserUseCase: GetUserUseCase;
  updateUserUseCase: UpdateUserUseCase;
  deleteUserUseCase: DeleteUserUseCase;
  listUsersUseCase: ListUsersUseCase;
}

export class UserController extends Controller {
  public readonly router: Router;
  private readonly dependencies: UserControllerDependencies;

  constructor(dependencies: UserControllerDependencies) {
    super();
    this.dependencies = dependencies;
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
    this.router.put(
      '/:id',
      validate(UpdateUserSchema),
      this.updateUser.bind(this),
    );
    this.router.delete('/:id', this.deleteUser.bind(this));
    this.router.get('/', this.listUsers.bind(this));
  }

  private async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.dependencies.createUserUseCase.execute(req.body);
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
      let { id } = req.params;
      if (id === 'me') {
        // @ts-ignore
        id = req.user.id;
      }
      const result = await this.dependencies.getUserUseCase.execute(id);
      if (result.success) {
        res.status(200).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.dependencies.updateUserUseCase.execute(
        id,
        req.body,
      );
      if (result.success) {
        res.status(200).json(result.value);
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.dependencies.deleteUserUseCase.execute(id);
      if (result.success) {
        res.status(204).send();
      } else {
        next(result.error);
      }
    } catch (error) {
      next(error);
    }
  }

  private async listUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.dependencies.listUsersUseCase.execute();
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