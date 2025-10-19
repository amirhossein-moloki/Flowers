export interface GetVendorDto {
  id: string;
  name: string;
  description: string | null;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
  createdAt: Date;
}
