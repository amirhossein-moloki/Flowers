import { Vendor as PrismaVendor } from '@prisma/client';
import { Vendor } from '../domain/vendor.entity';

export class VendorMapper {
  static toDomain(prismaVendor: PrismaVendor): Vendor {
    const vendorResult = Vendor.create(
      {
        name: prismaVendor.name,
        description: prismaVendor.description ?? undefined,
        email: prismaVendor.email,
        phone: prismaVendor.phone,
        address: prismaVendor.address,
        is_active: prismaVendor.is_active,
        createdAt: prismaVendor.created_at,
        updatedAt: prismaVendor.updated_at,
      },
      prismaVendor.id,
    );

    if (!vendorResult.success) {
      throw new Error(String(vendorResult.error));
    }

    return vendorResult.value;
  }

  static toPersistence(vendor: Vendor) {
    return {
      id: vendor.id,
      name: vendor.name,
      description: vendor.description,
      email: vendor.email,
      phone: vendor.phone,
      address: vendor.address,
      is_active: vendor.is_active,
    };
  }
}