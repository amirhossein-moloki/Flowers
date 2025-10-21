import { prismaMock } from '../helpers/prisma-mock.helper';
import { PrismaVendorOutletRepository } from '../../vendor-outlet/infrastructure/prisma-vendor-outlet.repository';
import { VendorOutlet } from '../../vendor-outlet/domain/vendor-outlet.entity';
import { VendorOutletMapper } from '../../vendor-outlet/infrastructure/vendor-outlet.mapper';
import { PrismaClient, VendorOutlet as PrismaVendorOutlet } from '@prisma/client';

describe('PrismaVendorOutletRepository', () => {
  let repository: PrismaVendorOutletRepository;

  beforeEach(() => {
    repository = new PrismaVendorOutletRepository(prismaMock as unknown as PrismaClient);
  });

  const now = new Date();
  const outletProps = {
    vendorId: 'vendor-id',
    name: 'Test Outlet',
    address: '456 Test Ave',
    latitude: 40.7128,
    longitude: -74.0060,
    is_active: true,
    createdAt: now,
    updatedAt: now,
  };

  const outletResult = VendorOutlet.create(outletProps, 'outlet-id');
  const outletEntity = outletResult.success ? outletResult.value : null;
  if (!outletEntity) {
    throw new Error('Test setup failed: could not create outlet entity');
  }

  const prismaOutlet: PrismaVendorOutlet = {
    id: 'outlet-id',
    vendor_id: outletProps.vendorId,
    name: outletProps.name,
    address: outletProps.address,
    latitude: outletProps.latitude,
    longitude: outletProps.longitude,
    is_active: outletProps.is_active,
    created_at: outletProps.createdAt,
    updated_at: outletProps.updatedAt,
  };

  it('should find an outlet by id', async () => {
    prismaMock.vendorOutlet.findUnique.mockResolvedValue(prismaOutlet);
    const result = await repository.findById('outlet-id');
    expect(result).toEqual(outletEntity);
    expect(prismaMock.vendorOutlet.findUnique).toHaveBeenCalledWith({ where: { id: 'outlet-id' } });
  });

  it('should find outlets by vendor id', async () => {
    prismaMock.vendorOutlet.findMany.mockResolvedValue([prismaOutlet]);
    const result = await repository.findByVendorId('vendor-id');
    expect(result).toEqual([outletEntity]);
    expect(prismaMock.vendorOutlet.findMany).toHaveBeenCalledWith({ where: { vendor_id: 'vendor-id' } });
  });

  it('should save an outlet', async () => {
    const persistenceData = VendorOutletMapper.toPersistence(outletEntity);
    const { vendor_id, ...createData } = persistenceData;
    const { id, ...updateData } = createData;
    prismaMock.vendorOutlet.upsert.mockResolvedValue(prismaOutlet);
    await repository.save(outletEntity);

    expect(prismaMock.vendorOutlet.upsert).toHaveBeenCalledWith({
      where: { id: 'outlet-id' },
      create: {
        ...createData,
        vendor: { connect: { id: outletEntity.vendorId } },
      },
      update: {
        ...updateData,
        vendor: { connect: { id: outletEntity.vendorId } },
      },
    });
  });

  it('should delete an outlet', async () => {
    prismaMock.vendorOutlet.delete.mockResolvedValue(prismaOutlet);
    const result = await repository.delete('outlet-id');
    expect(result).toBe(true);
    expect(prismaMock.vendorOutlet.delete).toHaveBeenCalledWith({ where: { id: 'outlet-id' } });
  });
});