import { IUserRepository } from '@/modules/user/domain/user.repository';
import { User } from '@/modules/user/domain/user.entity';
import prisma from '@/infrastructure/database/prisma/prisma-client';
import { UserMapper } from '@/modules/user/infrastructure/user.mapper';

export class PrismaUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { username } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async save(user: User): Promise<void> {
    const data = UserMapper.toPersistence(user);
    await prisma.user.upsert({
      where: { id: user.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}