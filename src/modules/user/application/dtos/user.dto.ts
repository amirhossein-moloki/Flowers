import { UserRole } from '../../domain/user.entity';

export interface GetUserDto {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

export interface UserDto {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}