import { CustomerAddress } from '../domain/customer-address.entity';
import { CustomerAddressDto } from '../application/dtos/customer-address.dto';

export class CustomerAddressMapper {
  static toDto(customerAddress: CustomerAddress): CustomerAddressDto {
    return {
      id: customerAddress.id,
      user_id: customerAddress.user_id,
      address_id: customerAddress.address_id,
      is_default: customerAddress.is_default,
      label: customerAddress.label,
    };
  }

  static toDomain(dto: CustomerAddressDto): CustomerAddress {
    const result = CustomerAddress.create({
      user_id: dto.user_id,
      address_id: dto.address_id,
      is_default: dto.is_default,
      label: dto.label,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(customerAddress: CustomerAddress): any {
    return {
      id: customerAddress.id,
      user_id: customerAddress.user_id,
      address_id: customerAddress.address_id,
      is_default: customerAddress.is_default,
      label: customerAddress.label,
    };
  }
}