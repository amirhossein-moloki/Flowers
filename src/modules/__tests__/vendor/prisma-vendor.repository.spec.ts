import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaVendorRepository } from '@/modules/vendor/infrastructure/prisma-vendor.repository';
import { Vendor } from '@/modules/vendor/domain/vendor.entity';
import { VendorMapper } from '@/modules/vendor/infrastructure/vendor.mapper';
import { PrismaClient } from '@prisma/client';

describe('PrismaVendorRepository', () => {
  let repository: PrismaVendorRepository;

  beforeEach(() => {
    repository = new PrismaVendorRepository(prismaMock as unknown as PrismaClient);
  });

  const vendorProps = {
    name: 'Test Vendor',
    description: 'Test Description',
    email: 'test@example.com',
    phone: '+12345678901',
    address: '123 Test St',
    is_active: true,
  };
  const vendorResult = Vendor.create(vendorProps, 'vendor-id-1');
  if (!vendorResult.success) {
    throw new Error('Test setup failed: could not create vendor entity');
  }
  const vendorEntity = vendorResult.value;

  const prismaVendor = {
    id: vendorEntity.id,
    ...vendorProps,
    created_at: new Date(),
    updated_at: new Date(),
  };

  test('findById should return a vendor entity when found', async () => {
    prismaMock.vendor.findUnique.mockResolvedValue(prismaVendor);

    const foundVendor = await repository.findById('vendor-id-1');

    expect(foundVendor).toBeInstanceOf(Vendor);
    expect(foundVendor?.id).toBe('vendor-id-1');
    expect(prismaMock.vendor.findUnique).toHaveBeenCalledWith({ where: { id: 'vendor-id-1' } });
  });

  test('findByEmail should return a vendor entity when found', async () => {
    prismaMock.vendor.findUnique.mockResolvedValue(prismaVendor);

    const foundVendor = await repository.findByEmail('test@example.com');

    expect(foundVendor).toBeInstanceOf(Vendor);
    expect(foundVendor?.email).toBe('test@example.com');
    expect(prismaMock.vendor.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
  });

  test('findByPhone should return a vendor entity when found', async () => {
    prismaMock.vendor.findUnique.mockResolvedValue(prismaVendor);

    const foundVendor = await repository.findByPhone('+12345678901');

    expect(foundVendor).toBeInstanceOf(Vendor);
    expect(foundVendor?.phone).toBe('+12345678901');
    expect(prismaMock.vendor.findUnique).toHaveBeenCalledWith({ where: { phone: '+12345678901' } });
  });

  test('findAll should return an array of vendor entities', async () => {
    prismaMock.vendor.findMany.mockResolvedValue([prismaVendor]);

    const vendors = await repository.findAll();

    expect(vendors).toHaveLength(1);
    expect(vendors[0]).toBeInstanceOf(Vendor);
  });

  test('save should call create on prisma client', async () => {
    prismaMock.vendor.create.mockResolvedValue(prismaVendor);
    await repository.save(vendorEntity);

    expect(prismaMock.vendor.create).toHaveBeenCalledWith({
      data: VendorMapper.toPersistence(vendorEntity),
    });
  });

  test('update should call update on prisma client', async () => {
    prismaMock.vendor.update.mockResolvedValue(prismaVendor);
    await repository.update(vendorEntity);

    expect(prismaMock.vendor.update).toHaveBeenCalledWith({
      where: { id: vendorEntity.id },
      data: VendorMapper.toPersistence(vendorEntity),
    });
  });

  test('delete should call delete on prisma client', async () => {
    await repository.delete('vendor-id-1');

    expect(prismaMock.vendor.delete).toHaveBeenCalledWith({
      where: { id: 'vendor-id-1' },
    });
  });
});
