export class DriverLocationDto {
  id: string;
  delivery_id: string;
  courier_id: string;
  lat: number;
  lng: number;
  speed_kmh: number;
  heading_deg: number;
  recorded_at: Date;
}