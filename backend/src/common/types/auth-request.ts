import { Request } from 'express';

import { UserRole } from '../../modules/user/domain/enums/user-role.enum';

interface AuthUser {
  id: string;
  role: UserRole;
  sessionId: string;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}
