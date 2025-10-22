import { Courier as PrismaCourier } from '@prisma/client';
import { Courier } from '../domain/courier.entity';
import { CourierDto } from '../application/dtos/courier.dto';

export class CourierMapper {
  public static toDto(courier: Courier): CourierDto {
    return {
      id: courier.id,
      name: courier.props.name,
      phone: courier.props.phone,
      email: courier.props.email,
      vehicle: courier.props.vehicle,
      isAvailable: courier.props.isAvailable,
    };
  }

  public static toDomain(raw: PrismaCourier): Courier {
    const courierResult = Courier.create(
      {
        name: raw.name,
        phone: raw.phone,
        email: raw.email,
        vehicle: raw.vehicle,
        isAvailable: raw.isAvailable,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id,
    );

    if (!courierResult.success) {
      throw new Error(`Failed to map raw data to Courier entity: ${courierResult.error.message}`);
    }
    return courierResult.value;
  }

  public static toPersistence(courier: Courier) {
    const props = courier.props;
    return {
      id: courier.id,
      name: props.name,
      phone: props.phone,
      email: props.email,
      vehicle: props.vehicle,
      isAvailable: props.isAvailable,
    };
  }
}