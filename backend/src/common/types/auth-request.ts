import type { Request } from 'express';

import { UserEntity } from '../../modules/user/domain/entities/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
