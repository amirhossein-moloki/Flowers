import { UserRole } from '../../../../../core/domain/enums';

export interface UserDto {
  id: string;
  username: string;
  full_name: string;
  phone: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  createdAt: Date;
}