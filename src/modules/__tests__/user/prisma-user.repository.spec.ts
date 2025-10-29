import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaUserRepository } from '@/modules/user/infrastructure/prisma-user.repository';
import { User } from '@/modules/user/domain/user.entity';
import { UserMapper } from '@/modules/user/infrastructure/user.mapper';
import { UserRole } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

describe('PrismaUserRepository', () => {
  let repository: PrismaUserRepository;

  beforeEach(() => {
    repository = new PrismaUserRepository(prismaMock as unknown as PrismaClient);
  });

  const userProps = {
    username: 'testuser',
    password: 'password123',
    email: 'test@example.com',
    role: UserRole.CUSTOMER,
  };
  const userResult = User.create(userProps, 'user-id-1');
  if (!userResult.success) {
    throw new Error('Test setup failed: could not create user entity');
  }
  const userEntity = userResult.value;

  const prismaUser = {
    id: userEntity.id,
    ...userProps,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('findById should return a user entity when found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(prismaUser);

    const foundUser = await repository.findById('user-id-1');

    expect(foundUser).toBeInstanceOf(User);
    expect(foundUser?.id).toBe('user-id-1');
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { id: 'user-id-1' } });
  });

  test('findByEmail should return a user entity when found', async () => {
    prismaMock.user.findUnique.mockResolvedValue(prismaUser);

    const foundUser = await repository.findByEmail('test@example.com');

    expect(foundUser).toBeInstanceOf(User);
    expect(foundUser?.email).toBe('test@example.com');
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
  });

  test('save should call upsert on prisma client', async () => {
    await repository.save(userEntity);

    expect(prismaMock.user.upsert).toHaveBeenCalledWith({
      where: { id: userEntity.id },
      create: UserMapper.toPersistence(userEntity),
      update: UserMapper.toPersistence(userEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('user-id-1');

    expect(prismaMock.user.delete).toHaveBeenCalledWith({
      where: { id: 'user-id-1' },
    });
  });
});