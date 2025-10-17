export class AddressDto {
  id: string;
  formatted: string;
  city: string;
  province: string;
  postal_code: string;
  lat: number;
  lng: number;
  extra?: any;
}