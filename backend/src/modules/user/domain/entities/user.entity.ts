import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export interface UserEntity {
  id: string;
  email: string;
  password: string;
  quota: number;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}
