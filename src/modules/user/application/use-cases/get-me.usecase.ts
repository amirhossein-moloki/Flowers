import { User } from '../../domain/user.entity';
import { IUserRepository } from '../../domain/user.repository.interface';

export class GetMeUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
