import { User as PrismaUser, UserRole as PrismaUserRole } from '@prisma/client';
import { User, UserRole } from '@/modules/user/domain/user.entity';
import { UserDto } from '@/modules/user/application/dtos/user.dto';

const toDomainRole = (role: PrismaUserRole): UserRole => {
  switch (role) {
    case PrismaUserRole.ADMIN:
      return UserRole.ADMIN;
    case PrismaUserRole.CUSTOMER:
      return UserRole.CUSTOMER;
    case PrismaUserRole.DRIVER:
      return UserRole.DRIVER;
    case PrismaUserRole.VENDOR:
      return UserRole.VENDOR;
    default:
      throw new Error(`Unknown role: ${role}`);
  }
};

export class UserMapper {
  /**
   * Converts a Prisma query result to a domain User entity.
   */
  public static toDomain(raw: PrismaUser): User {
    const userResult = User.create(
      {
        username: raw.username,
        email: raw.email,
        role: toDomainRole(raw.role),
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );

    // This should ideally not fail if DB data is valid
    if (!userResult.success) {
      throw new Error(`Failed to map raw data to User entity: ${userResult.error.message}`);
    }
    return userResult.value;
  }

  /**
   * Converts a domain User entity to a format suitable for Prisma.
   */
  public static toPersistence(user: User) {
    const props = user.props;
    return {
      id: user.id,
      username: props.username,
      email: props.email,
      role: props.role,
      password: props.password,
    };
  }

  /**
   * Converts a domain User entity to a public-facing DTO.
   */
  public static toDto(user: User): UserDto {
    const props = user.props;
    return {
      id: user.id,
      username: props.username,
      email: props.email,
      role: props.role,
      createdAt: user.props.createdAt ?? new Date(),
    };
  }
}