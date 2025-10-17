import { Address as PrismaAddress } from '@prisma/client';
import { Address } from '../domain/address.entity';

export class AddressMapper {
  public static toDomain(raw: PrismaAddress): Address {
    const addressResult = Address.create(
      {
        street: raw.street,
        city: raw.city,
        state: raw.state,
        zipCode: raw.zipCode,
        country: raw.country,
        isResidential: raw.isResidential,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );

    if (!addressResult.success) {
      throw new Error(`Failed to map raw data to Address entity: ${addressResult.error.message}`);
    }
    return addressResult.value;
  }

  public static toPersistence(address: Address) {
    const props = address.props;
    return {
      id: address.id,
      street: props.street,
      city: props.city,
      state: props.state,
      zipCode: props.zipCode,
      country: props.country,
      isResidential: props.isResidential,
    };
  }
}