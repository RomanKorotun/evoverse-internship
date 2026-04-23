import { Injectable, Logger } from '@nestjs/common';

import { FindUserByIdUseCase } from '../../../user/application/find-user-by-id/find-user-by-id.usecase';
import { UserEntity } from '../../../user/domain/entities/user.entity';

@Injectable()
export class MeUseCase {
  private readonly logger = new Logger(MeUseCase.name);
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}
  async execute(id: string): Promise<UserEntity> {
    const user = await this.findUserByIdUseCase.execute(id);

    this.logger.log({
      event: 'USER_PROFILE_REQUESTED',
      userId: user.id,
      email: user.email,
      role: user.role,
      quota: user.quota,
      status: user.status,
      timestamp: new Date().toISOString(),
    });

    return user;
  }
}
