import { UserStatus } from '../../../user/domain/enums/user-status.enum';

export interface ChangeUserStatusCommand {
  userId: string;
  status: UserStatus;
}
