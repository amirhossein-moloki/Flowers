import { UserDto } from '../dtos/user.dto';
import { IUserRepository } from '../../domain/user.repository.interface';
import { UserMapper } from '../../infrastructure/user.mapper';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map(UserMapper.toDto);
  }
}
