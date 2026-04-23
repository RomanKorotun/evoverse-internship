import { UserStatus } from '../../domain/enums/user-status.enum';

export interface UpdateUserStatusCommand {
  userId: string;
  status: UserStatus;
}
