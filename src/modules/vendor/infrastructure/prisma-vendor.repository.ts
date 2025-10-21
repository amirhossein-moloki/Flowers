import { IVendorRepository } from '@/modules/vendor/domain/vendor.repository';
import { Vendor } from '@/modules/vendor/domain/vendor.entity';
import { PrismaClient } from '@prisma/client';
import { VendorMapper } from '@/modules/vendor/infrastructure/vendor.mapper';

export class PrismaVendorRepository implements IVendorRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Vendor | null> {
    const vendor = await this.prisma.vendor.findUnique({ where: { id } });
    return vendor ? VendorMapper.toDomain(vendor) : null;
  }

  async findByEmail(email: string): Promise<Vendor | null> {
    const vendor = await this.prisma.vendor.findUnique({ where: { email } });
    return vendor ? VendorMapper.toDomain(vendor) : null;
  }

  async findByPhone(phone: string): Promise<Vendor | null> {
    const vendor = await this.prisma.vendor.findUnique({ where: { phone } });
    return vendor ? VendorMapper.toDomain(vendor) : null;
  }

  async findAll(): Promise<Vendor[]> {
    const vendors = await this.prisma.vendor.findMany();
    return vendors.map(VendorMapper.toDomain);
  }

  async save(vendor: Vendor): Promise<Vendor> {
    const data = VendorMapper.toPersistence(vendor);
    const newVendor = await this.prisma.vendor.upsert({
      where: { id: vendor.id },
      create: {
        id: data.id,
        name: data.name,
        description: data.description,
        email: data.email,
        phone: data.phone,
        address: data.address,
        is_active: data.is_active,
      },
      update: {
        name: data.name,
        description: data.description,
        email: data.email,
        phone: data.phone,
        address: data.address,
        is_active: data.is_active,
      },
    });
    return VendorMapper.toDomain(newVendor);
  }

  async update(vendor: Vendor): Promise<Vendor> {
    const data = VendorMapper.toPersistence(vendor);
    const updatedVendor = await this.prisma.vendor.update({
      where: { id: vendor.id },
      data,
    });
    return VendorMapper.toDomain(updatedVendor);
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.vendor.delete({ where: { id } });
    return true;
  }
}
