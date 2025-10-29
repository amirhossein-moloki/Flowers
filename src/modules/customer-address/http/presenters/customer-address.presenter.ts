import { CustomerAddressDto } from '../../application/dtos/customer-address.dto';

import { AddressPresenter } from '@/modules/address/presentation/address.presenter';

export class CustomerAddressPresenter {
  static toJSON(customerAddress: CustomerAddressDto) {
    return {
      id: customerAddress.id,
      user_id: customerAddress.user_id,
      address_id: customerAddress.address_id,
      is_default: customerAddress.is_default,
      label: customerAddress.label,
      address: customerAddress.address ? AddressPresenter.toJSON(customerAddress.address) : undefined,
    };
  }
}
