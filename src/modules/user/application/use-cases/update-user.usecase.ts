import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, data: Partial<User>): Promise<Result<User, HttpError>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return failure(HttpError.notFound('User not found.'));
    }

    const updatedUser = Object.assign(user, data);

    await this.userRepository.update(updatedUser);

    return success(updatedUser);
  }
}