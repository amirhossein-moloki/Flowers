import { VendorOutlet as PrismaVendorOutlet } from '@prisma/client';
import { VendorOutlet } from '../domain/vendor-outlet.entity';

export class VendorOutletMapper {
  static toDomain(prismaVendorOutlet: PrismaVendorOutlet): VendorOutlet {
    const vendorOutletResult = VendorOutlet.create(
      {
        vendorId: prismaVendorOutlet.vendor_id,
        name: prismaVendorOutlet.name,
        address: prismaVendorOutlet.address,
        latitude: prismaVendorOutlet.latitude,
        longitude: prismaVendorOutlet.longitude,
        is_active: prismaVendorOutlet.is_active,
        createdAt: prismaVendorOutlet.created_at,
        updatedAt: prismaVendorOutlet.updated_at,
      },
      prismaVendorOutlet.id,
    );

    if (!vendorOutletResult.success) {
      throw new Error(String(vendorOutletResult.error));
    }

    return vendorOutletResult.value;
  }

  static toPersistence(vendorOutlet: VendorOutlet) {
    return {
      id: vendorOutlet.id,
      name: vendorOutlet.name,
      address: vendorOutlet.address,
      latitude: vendorOutlet.latitude,
      longitude: vendorOutlet.longitude,
      is_active: vendorOutlet.is_active,
    };
  }
}