import { IUserRepository } from '../../domain/user.repository.interface';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserDto } from '../dtos/user.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { UserMapper } from '../../infrastructure/user.mapper';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserDto): Promise<Result<UserDto, HttpError>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return failure(HttpError.notFound('User not found.'));
    }

    // Update user properties
    user.props.username = data.username ?? user.props.username;
    user.props.email = data.email ?? user.props.email;
    user.props.role = data.role ?? user.props.role;
    if (data.password) {
      // In a real app, hash the password here
      user.props.password = data.password;
    }

    await this.userRepository.save(user);

    const userDto = UserMapper.toDto(user);
    return success(userDto);
  }
}