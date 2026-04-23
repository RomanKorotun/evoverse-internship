import { UserEntity } from '../../../user/domain/entities/user.entity';

export interface SigninResponse {
  user: UserEntity;
  accessToken: string;
}
