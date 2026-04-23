import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserStatus } from '../../../user/domain/enums/user-status.enum';

export class ChangeUserStatusDto {
  @IsNotEmpty({ message: 'status є обовʼязковим' })
  @IsEnum(UserStatus, { message: 'status має бути ACTIVE або BLOCKED' })
  status!: UserStatus;
}
