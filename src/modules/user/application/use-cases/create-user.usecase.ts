import { IUserRepository } from '../../domain/user.repository.interface';
import { User, IUserProps, UserRole as DomainUserRole } from '../../domain/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { Result, success, failure } from '@/core/utils/result';
import { HttpError } from '@/core/errors/http-error';
import { UserMapper } from '../../infrastructure/user.mapper';
import { UserRole as PrismaUserRole } from '@prisma/client';

// Helper function to map Prisma UserRole to Domain UserRole
const toDomainUserRole = (role: PrismaUserRole): DomainUserRole => {
  switch (role) {
    case PrismaUserRole.ADMIN:
      return DomainUserRole.ADMIN;
    case PrismaUserRole.CUSTOMER:
      return DomainUserRole.CUSTOMER;
    case PrismaUserRole.DRIVER:
      return DomainUserRole.DRIVER;
    case PrismaUserRole.VENDOR:
      return DomainUserRole.VENDOR;
    default:
      throw new Error(`Invalid user role: ${role}`);
  }
};


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
    const userProps: IUserProps = { ...dto, role: toDomainUserRole(dto.role) };
    const userResult = User.create(userProps);

    if (!userResult.success) {
      return failure(HttpError.internalServerError(userResult.error.message));
    }
    const user = userResult.value;

    // 3. Persist the user
    // Note: In a real app, password hashing would happen here before saving
    await this.userRepository.save(user);

    // 4. Return a public-facing DTO
    const userDto = UserMapper.toDto(user);
    return success(userDto);
  }
}
