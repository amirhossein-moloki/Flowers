import { Vendor } from '@/modules/vendor/domain/vendor.entity';

export class VendorPresenter {
  static toJSON(vendor: Vendor) {
    return {
      id: vendor.id,
      name: vendor.name,
      description: vendor.description,
      email: vendor.email,
      phone: vendor.phone,
      address: vendor.address,
      is_active: vendor.is_active,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
    };
  }
}
