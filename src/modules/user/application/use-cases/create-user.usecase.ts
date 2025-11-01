import { IUserRepository } from '../../domain/user.repository.interface';
import { User, IUserProps } from '../../domain/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { UserMapper } from '../../infrastructure/user.mapper';
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: CreateUserDto): Promise<Result<UserDto, HttpError>> {
    const { email, username } = dto;
    // 1. Check for existing user by email or username
    const existingByEmail = await this.userRepository.findByEmail(email);
    if (existingByEmail) {
      return failure(HttpError.badRequest('Email already in use.'));
    }
    const existingByUsername = await this.userRepository.findByUsername(username);
    if (existingByUsername) {
      return failure(HttpError.badRequest('Username already taken.'));
    }

    // 2. Create the User entity
    const userProps: IUserProps = { ...dto };
    const userResult = User.create(userProps);

    if (userResult.isFailure()) {
      return failure(HttpError.internalServerError(userResult.error?.message));
    }
    const user = userResult.value;

    if (!user) {
      return failure(HttpError.internalServerError('Failed to create user'));
    }

    // 3. Persist the user
    // Note: In a real app, password hashing would happen here before saving
    const savedUser = await this.userRepository.save(user);

    // 4. Return a public-facing DTO
    const userDto = UserMapper.toDto(savedUser);
    return success(userDto);
  }
}
