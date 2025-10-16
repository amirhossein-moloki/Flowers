import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Result, success, failure } from '../../../../../core/utils/result';
import { HttpError } from '../../../../../core/errors/http-error';

// This is a simplified example. In a real app, you'd hash the password.
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDto): Promise<Result<User, HttpError>> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      return failure(HttpError.badRequest('Email already in use.'));
    }

    const userResult = User.create({
      email: dto.email,
      name: dto.name,
      passwordHash: dto.password, // HASH THIS in a real app
    });

    if (!userResult.success) {
      return failure(HttpError.internalServerError(userResult.error.message));
    }

    const user = userResult.value;
    await this.userRepository.save(user);

    return success(user);
  }
}