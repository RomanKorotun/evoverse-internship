import { UserRole } from '../../domain/enums/user-role.enum';

export interface CreateUserCommand {
  email: string;
  password: string;
  quota: number;
  role?: UserRole;
}
