import { CustomerAddress } from '@/modules/customer-address/domain/customer-address.entity';

export class CustomerAddressPresenter {
  static toJSON(customerAddress: CustomerAddress) {
    return {
      id: customerAddress.id,
      user_id: customerAddress.user_id,
      address_id: customerAddress.address_id,
      is_default: customerAddress.is_default,
      label: customerAddress.label,
    };
  }
}