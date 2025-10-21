import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaCustomerAddressRepository } from '@/modules/customer-address/infrastructure/prisma-customer-address.repository';
import { CustomerAddress } from '@/modules/customer-address/domain/customer-address.entity';
import { CustomerAddressMapper } from '@/modules/customer-address/infrastructure/customer-address.mapper';

describe('PrismaCustomerAddressRepository', () => {
  let repository: PrismaCustomerAddressRepository;

  beforeEach(() => {
    repository = new PrismaCustomerAddressRepository(prismaMock);
  });

  const customerAddressProps = {
    user_id: 'user-123',
    address_id: 'address-456',
    is_default: true,
    label: 'Home',
  };
  const customerAddressResult = CustomerAddress.create(customerAddressProps, 'ca-id-1');
  if (!customerAddressResult.success) {
    throw new Error('Test setup failed: could not create customer address entity');
  }
  const customerAddressEntity = customerAddressResult.value;

  const prismaCustomerAddress = {
    id: customerAddressEntity.id,
    ...customerAddressProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  test('findById should return a customer address entity when found', async () => {
    prismaMock.customerAddress.findUnique.mockResolvedValue(prismaCustomerAddress);

    const foundAddress = await repository.findById('ca-id-1');

    expect(foundAddress).toBeInstanceOf(CustomerAddress);
    expect(foundAddress?.id).toBe('ca-id-1');
    expect(prismaMock.customerAddress.findUnique).toHaveBeenCalledWith({ where: { id: 'ca-id-1' }, include: { address: true } });
  });

  test('findById should return null when address is not found', async () => {
    prismaMock.customerAddress.findUnique.mockResolvedValue(null);

    const foundAddress = await repository.findById('non-existent-id');

    expect(foundAddress).toBeNull();
  });

  test('findAll should return an array of customer address entities', async () => {
    prismaMock.customerAddress.findMany.mockResolvedValue([prismaCustomerAddress]);

    const addresses = await repository.findAll();

    expect(addresses).toHaveLength(1);
    expect(addresses[0]).toBeInstanceOf(CustomerAddress);
    expect(prismaMock.customerAddress.findMany).toHaveBeenCalledWith({ include: { address: true } });
  });

  test('save should call upsert on prisma client', async () => {
    await repository.save(customerAddressEntity);

    expect(prismaMock.customerAddress.upsert).toHaveBeenCalledWith({
      where: { id: customerAddressEntity.id },
      create: CustomerAddressMapper.toPersistence(customerAddressEntity),
      update: CustomerAddressMapper.toPersistence(customerAddressEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('ca-id-1');

    expect(prismaMock.customerAddress.delete).toHaveBeenCalledWith({
      where: { id: 'ca-id-1' },
    });
  });
});