import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaAddressRepository } from '@/modules/address/infrastructure/prisma-address.repository';
import { Address } from '@/modules/address/domain/address.entity';
import { AddressMapper } from '@/modules/address/infrastructure/address.mapper';

describe('PrismaAddressRepository', () => {
  let repository: PrismaAddressRepository;

  beforeEach(() => {
    repository = new PrismaAddressRepository();
  });

  const addressProps = {
    street: '123 Test St',
    city: 'Testville',
    state: 'TS',
    zipCode: '54321',
    country: 'Testland',
    isResidential: false,
  };
  const addressResult = Address.create(addressProps, 'test-id');
  if (!addressResult.success) {
    throw new Error('Test setup failed: could not create address entity');
  }
  const addressEntity = addressResult.value;

  const prismaAddress = {
    id: addressEntity.id,
    ...addressProps,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  test('findById should return an address entity when found', async () => {
    prismaMock.address.findUnique.mockResolvedValue(prismaAddress);

    const foundAddress = await repository.findById('test-id');

    expect(foundAddress).toBeInstanceOf(Address);
    expect(foundAddress?.id).toBe('test-id');
    expect(prismaMock.address.findUnique).toHaveBeenCalledWith({ where: { id: 'test-id' } });
  });

  test('findById should return null when address is not found', async () => {
    prismaMock.address.findUnique.mockResolvedValue(null);

    const foundAddress = await repository.findById('non-existent-id');

    expect(foundAddress).toBeNull();
  });

  test('save should call upsert on prisma client', async () => {
    await repository.save(addressEntity);

    expect(prismaMock.address.upsert).toHaveBeenCalledWith({
      where: { id: addressEntity.id },
      create: AddressMapper.toPersistence(addressEntity),
      update: AddressMapper.toPersistence(addressEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('test-id');

    expect(prismaMock.address.delete).toHaveBeenCalledWith({
      where: { id: 'test-id' },
    });
  });
});