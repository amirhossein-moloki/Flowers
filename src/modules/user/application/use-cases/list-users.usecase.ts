import { IUserRepository } from '../../domain/user.repository.interface';
import { UserDto } from '../dtos/user.dto';
import { Result, success } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { UserMapper } from '../../infrastructure/user.mapper';

export class ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<Result<UserDto[], HttpError>> {
    const users = await this.userRepository.findAll();
    const userDtos = users.map(UserMapper.toDto);
    return success(userDtos);
  }
}