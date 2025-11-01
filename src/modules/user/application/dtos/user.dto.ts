import { UserRole } from '@prisma/client';

export interface UserDto {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}
