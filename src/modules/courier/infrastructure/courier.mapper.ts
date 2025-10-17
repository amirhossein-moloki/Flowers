import { Courier } from '../domain/courier.entity';
import { CourierDto } from '../application/dtos/courier.dto';

export class CourierMapper {
  static toDto(courier: Courier): CourierDto {
    return {
      id: courier.id,
      user_id: courier.user_id,
      vehicle_type: courier.vehicle_type,
      plate_number: courier.plate_number,
      is_active: courier.is_active,
      last_seen_at: courier.last_seen_at,
      current_lat: courier.current_lat,
      current_lng: courier.current_lng,
    };
  }

  static toDomain(dto: CourierDto): Courier {
    const result = Courier.create({
      user_id: dto.user_id,
      vehicle_type: dto.vehicle_type,
      plate_number: dto.plate_number,
      is_active: dto.is_active,
      last_seen_at: dto.last_seen_at,
      current_lat: dto.current_lat,
      current_lng: dto.current_lng,
    }, dto.id);

    if (result.success) {
      return result.value;
    } else {
      throw result.error;
    }
  }

  static toPersistence(courier: Courier): any {
    return {
      id: courier.id,
      user_id: courier.user_id,
      vehicle_type: courier.vehicle_type,
      plate_number: courier.plate_number,
      is_active: courier.is_active,
      last_seen_at: courier.last_seen_at,
      current_lat: courier.current_lat,
      current_lng: courier.current_lng,
    };
  }
}