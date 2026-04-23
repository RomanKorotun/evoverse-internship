import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../domain/entities/user.entity';
import { UserRole } from '../../domain/enums/user-role.enum';
import { UserStatus } from '../../domain/enums/user-status.enum';

export interface UserResponse {
  id: string;
  email: string;
  quota: number;
  role: UserRole;
  status: UserStatus;
}

@Injectable()
export class UserMapper {
  toResponse(user: UserEntity): UserResponse {
    return {
      id: user.id,
      email: user.email,
      quota: user.quota,
      role: user.role,
      status: user.status,
    };
  }
}
