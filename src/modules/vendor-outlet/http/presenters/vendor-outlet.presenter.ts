import { VendorOutlet } from '@/modules/vendor-outlet/domain/vendor-outlet.entity';
import { VendorPresenter } from '@/modules/vendor/http/presenters/vendor.presenter';

export class VendorOutletPresenter {
  static toJSON(vendorOutlet: VendorOutlet) {
    return {
      id: vendorOutlet.id,
      vendorId: vendorOutlet.vendorId,
      name: vendorOutlet.name,
      address: vendorOutlet.address,
      latitude: vendorOutlet.latitude,
      longitude: vendorOutlet.longitude,
      is_active: vendorOutlet.is_active,
      vendor: vendorOutlet.vendor
        ? VendorPresenter.toJSON(vendorOutlet.vendor)
        : undefined,
    };
  }
}
