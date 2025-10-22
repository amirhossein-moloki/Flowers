export interface CreateCourierDto {
  name: string;
  phone: string;
  email: string;
  vehicle?: string;
  isAvailable?: boolean;
}
