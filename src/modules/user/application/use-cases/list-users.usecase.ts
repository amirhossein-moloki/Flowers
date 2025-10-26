import { IUserRepository } from '../../domain/user.repository.interface';
import { User } from '../../domain/user.entity';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<Result<User[], HttpError>> {
    const users = await this.userRepository.findAll();
    return success(users);
  }
}