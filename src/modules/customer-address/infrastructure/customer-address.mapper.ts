import { CustomerAddress } from '../domain/customer-address.entity';
import { CustomerAddress as PrismaCustomerAddress, Address as PrismaAddress } from '@prisma/client';
import { AddressMapper } from '@/modules/address/infrastructure/address.mapper';

export class CustomerAddressMapper {
  public static toDomain(prismaAddress: PrismaCustomerAddress & { address?: PrismaAddress }): CustomerAddress {
    const addressResult = CustomerAddress.create({
      user_id: prismaAddress.user_id,
      address_id: prismaAddress.address_id,
      // @ts-ignore
      address: prismaAddress.address ? AddressMapper.toDomain(prismaAddress.address) : undefined,
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

  public static toDto(customerAddress: CustomerAddress) {
    return {
      id: customerAddress.id,
      user_id: customerAddress.user_id,
      address_id: customerAddress.address_id,
      is_default: customerAddress.is_default,
      label: customerAddress.label,
      address: customerAddress.address ? AddressMapper.toDto(customerAddress.address) : undefined,
    };
  }
}