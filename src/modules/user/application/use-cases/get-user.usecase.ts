import { IUserRepository } from '../../domain/user.repository';
import { GetUserDto } from '../dtos/get-user.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';
import { UserMapper } from '../../infrastructure/user.mapper';

export class GetUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<Result<GetUserDto, HttpError>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return failure(HttpError.notFound('User not found.'));
    }

    const userDto = UserMapper.toDto(user);
    return success(userDto);
  }
}