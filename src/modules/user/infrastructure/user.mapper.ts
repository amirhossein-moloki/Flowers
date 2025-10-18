import { User as PrismaUser } from '@prisma/client';
import { User } from '@/modules/user/domain/user.entity';
import { UserDto } from '@/modules/user/application/dtos/user.dto';

export class UserMapper {
  /**
   * Converts a Prisma query result to a domain User entity.
   */
  public static toDomain(raw: PrismaUser): User {
    const userResult = User.create(
      {
        username: raw.username,
        full_name: raw.full_name,
        phone: raw.phone,
        email: raw.email,
        role: raw.role, // Assumes role in Prisma is compatible with UserRole enum
        is_active: raw.is_active,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
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
      full_name: props.full_name,
      phone: props.phone,
      email: props.email,
      role: props.role,
      is_active: props.is_active,
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
      full_name: props.full_name,
      phone: props.phone,
      email: props.email,
      role: props.role,
      is_active: props.is_active,
      createdAt: user.props.createdAt,
    };
  }
}