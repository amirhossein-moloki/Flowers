import { User as PrismaUser } from '@prisma/client';
import { User } from '../domain/user.entity';
import { GetUserDto } from '../application/dtos/get-user.dto';

export class UserMapper {
  public static toDomain(raw: PrismaUser): User {
    const userResult = User.create(
      {
        email: raw.email,
        name: raw.name ?? '',
        passwordHash: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );

    if (userResult.success) {
      return userResult.value;
    }
    // This should ideally not happen if data from Prisma is valid
    throw new Error('Failed to map prisma user to domain.');
  }

  public static toPersistence(user: User): Omit<PrismaUser, 'createdAt' | 'updatedAt'> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.passwordHash,
    };
  }

  public static toDto(user: User): GetUserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.props.createdAt!,
    };
  }
}