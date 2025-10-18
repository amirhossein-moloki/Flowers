import { Address } from '@/modules/address/domain/address.entity';

export class AddressPresenter {
  static toJSON(address: Address) {
    return {
      id: address.id,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isResidential: address.isResidential,
      createdAt: address.props.createdAt,
      updatedAt: address.props.updatedAt,
    };
  }
}