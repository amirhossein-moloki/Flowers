import { Request, Response } from 'express';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { ListUsersUseCase } from '../application/use-cases/list-users.usecase';

interface UserControllerDependencies {
  createUserUseCase: CreateUserUseCase;
  getUserUseCase: GetUserUseCase;
  updateUserUseCase: UpdateUserUseCase;
  deleteUserUseCase: DeleteUserUseCase;
  listUsersUseCase: ListUsersUseCase;
}

export class UserController {
  private readonly createUserUseCase: CreateUserUseCase;
  private readonly getUserUseCase: GetUserUseCase;
  private readonly updateUserUseCase: UpdateUserUseCase;
  private readonly deleteUserUseCase: DeleteUserUseCase;
  private readonly listUsersUseCase: ListUsersUseCase;

  constructor(dependencies: UserControllerDependencies) {
    this.createUserUseCase = dependencies.createUserUseCase;
    this.getUserUseCase = dependencies.getUserUseCase;
    this.updateUserUseCase = dependencies.updateUserUseCase;
    this.deleteUserUseCase = dependencies.deleteUserUseCase;
    this.listUsersUseCase = dependencies.listUsersUseCase;
  }

  create = async (req: Request, res: Response) => {
    const result = await this.createUserUseCase.execute(req.body);
    if (result.success) {
      res.status(201).json(result.value);
    } else {
      res.status(400).json({ error: result.error.message });
    }
  };

  findAll = async (req: Request, res: Response) => {
    const result = await this.listUsersUseCase.execute();
    if (result.success) {
      res.status(200).json(result.value);
    } else {
      res.status(400).json({ error: result.error.message });
    }
  };

  me = async (req: Request, res: Response) => {
    // @ts-ignore
    const { id } = req.user;
    const result = await this.getUserUseCase.execute(id);
    if (result.success) {
      res.status(200).json(result.value);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  };

  findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.getUserUseCase.execute(id);
    if (result.success) {
      res.status(200).json(result.value);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  };

  update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.updateUserUseCase.execute(id, req.body);
    if (result.success) {
      res.status(200).json(result.value);
    } else {
      res.status(400).json({ error: result.error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.deleteUserUseCase.execute(id);
    if (result.success) {
      res.status(204).send();
    } else {
      res.status(400).json({ error: result.error.message });
    }
  };
}
