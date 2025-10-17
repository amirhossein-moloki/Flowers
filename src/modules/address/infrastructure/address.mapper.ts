import { Address } from '../domain/address.entity';
import { AddressDto } from '../application/dtos/address.dto';

export class AddressMapper {
  static toDto(address: Address): AddressDto {
    return {
      id: address.id,
      formatted: address.formatted,
      city: address.city,
      province: address.province,
      postal_code: address.postal_code,
      lat: address.lat,
      lng: address.lng,
      extra: address.extra,
    };
  }

  static toDomain(dto: AddressDto): Address {
    const result = Address.create({
      formatted: dto.formatted,
      city: dto.city,
      province: dto.province,
      postal_code: dto.postal_code,
      lat: dto.lat,
      lng: dto.lng,
      extra: dto.extra,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(address: Address): any {
    return {
      id: address.id,
      formatted: address.formatted,
      city: address.city,
      province: address.province,
      postal_code: address.postal_code,
      lat: address.lat,
      lng: address.lng,
      extra: address.extra,
    };
  }
}