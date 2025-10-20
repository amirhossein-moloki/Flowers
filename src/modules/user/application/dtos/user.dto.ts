import { UserRole } from '../../../../../core/domain/enums';

export interface UserDto {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}