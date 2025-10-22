export interface CourierDto {
  id: string;
  name: string;
  phone: string;
  email: string;
  vehicle: string | null;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}
