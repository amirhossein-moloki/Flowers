import { Request, Response } from 'express';
import { CreateUserUseCase } from '../application/use-cases/create-user.usecase';
import { GetUserUseCase } from '../application/use-cases/get-user.usecase';
import { UpdateUserUseCase } from '../application/use-cases/update-user.usecase';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.usecase';
import { ListUsersUseCase } from '../application/use-cases/list-users.usecase';
import { UserPresenter } from './presenters/user.presenter';
import { CreateUserInput } from './dto/create-user.schema';
import { PrismaUserRepository } from '../infrastructure/prisma-user.repository';

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const createUserUseCase = new CreateUserUseCase(new PrismaUserRepository());
    const result = await createUserUseCase.execute(req.body as CreateUserInput);

    if (!result.success) {
      return res.status(400).json({ error: result.error.message });
    }

    return res.status(201).json(UserPresenter.toJSON(result.value));
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const getUserUseCase = new GetUserUseCase(new PrismaUserRepository());
    const result = await getUserUseCase.execute({ id });

    if (!result.success) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(UserPresenter.toJSON(result.value));
  }

  async me(req: Request, res: Response): Promise<Response> {
    // @ts-ignore
    const userId = req.user.id;
    const getUserUseCase = new GetUserUseCase(new PrismaUserRepository());
    const result = await getUserUseCase.execute({ id: userId });

    if (!result.success) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(UserPresenter.toJSON(result.value));
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateUserUseCase = new UpdateUserUseCase(new PrismaUserRepository());
    const result = await updateUserUseCase.execute(id, req.body);

    if (!result.success) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(UserPresenter.toJSON(result.value));
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteUserUseCase = new DeleteUserUseCase(new PrismaUserRepository());
    const result = await deleteUserUseCase.execute(id);

    if (!result.success) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(204).send();
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const listUsersUseCase = new ListUsersUseCase(new PrismaUserRepository());
    const result = await listUsersUseCase.execute();

    return res.status(200).json(result.value.map(UserPresenter.toJSON));
  }
}