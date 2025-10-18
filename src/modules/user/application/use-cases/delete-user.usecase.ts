import { IUserRepository } from '../../domain/user.repository';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<Result<null, HttpError>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return failure(HttpError.notFound('User not found.'));
    }

    await this.userRepository.delete(id);

    return success(null);
  }
}