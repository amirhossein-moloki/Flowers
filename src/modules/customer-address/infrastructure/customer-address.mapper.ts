import { CustomerAddress } from '../domain/customer-address.entity';
import { CustomerAddress as PrismaCustomerAddress } from '@prisma/client';

export class CustomerAddressMapper {
  public static toDomain(prismaAddress: PrismaCustomerAddress): CustomerAddress {
    const addressResult = CustomerAddress.create({
      user_id: prismaAddress.user_id,
      address_id: prismaAddress.address_id,
      is_default: prismaAddress.is_default,
      label: prismaAddress.label,
    }, prismaAddress.id);

    if (addressResult.success) {
      return addressResult.value;
    }
    throw new Error(`Could not create domain entity from prisma data: ${addressResult.error}`);
  }

  public static toPersistence(address: CustomerAddress) {
    return {
      id: address.id,
      user_id: address.user_id,
      address_id: address.address_id,
      is_default: address.is_default,
      label: address.label,
    };
  }
}