import { VehicleType } from '../../../../../core/domain/enums';

export class CourierDto {
  id: string;
  user_id: string;
  vehicle_type: VehicleType;
  plate_number: string;
  is_active: boolean;
  last_seen_at: Date;
  current_lat: number;
  current_lng: number;
}