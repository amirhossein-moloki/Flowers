import { User } from '../../domain/user.entity';
import { IUserRepository } from '../../domain/user.repository.interface';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
