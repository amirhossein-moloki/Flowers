import { Vendor as PrismaVendor } from '@prisma/client';
import { Vendor } from '@/modules/vendor/domain/vendor.entity';
import { VendorDto } from '@/modules/vendor/application/dtos/vendor.dto';

export class VendorMapper {
  public static toDomain(raw: PrismaVendor): Vendor {
    const vendorResult = Vendor.create(
      {
        name: raw.name,
        description: raw.description,
        email: raw.email,
        phone: raw.phone,
        address: raw.address,
        is_active: raw.is_active,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    );

    if (!vendorResult.success) {
      throw new Error(`Failed to map raw data to Vendor entity: ${vendorResult.error.message}`);
    }
    return vendorResult.value;
  }

  public static toPersistence(vendor: Vendor) {
    const props = vendor.props;
    return {
      id: vendor.id,
      name: props.name,
      description: props.description,
      email: props.email,
      phone: props.phone,
      address: props.address,
      is_active: props.is_active,
    };
  }

  public static toDto(vendor: Vendor): VendorDto {
    const props = vendor.props;
    return {
      id: vendor.id,
      name: props.name,
      description: props.description,
      email: props.email,
      phone: props.phone,
      address: props.address,
      is_active: props.is_active,
      createdAt: vendor.createdAt,
    };
  }
}
