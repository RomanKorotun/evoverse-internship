import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import { RevokeSessionCommand } from './revoke-session.command';
import type { ISessionsRepository } from '../../domain/repositories/session.repository';

@Injectable()
export class RevokeSessionUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepository: ISessionsRepository,
  ) {}
  async execute(command: RevokeSessionCommand) {
    const session = await this.sessionsRepository.deleteByIdAndUserId(command);

    if (!session) {
      throw new ForbiddenException('Session not found or not yours');
    }

    return {
      success: true,
      revokedSessionId: session.id,
    };
  }
}
