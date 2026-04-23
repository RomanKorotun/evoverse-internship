import { Inject, Injectable } from '@nestjs/common';

import type { ISessionsRepository } from '../../domain/repositories/session.repository';

@Injectable()
export class FindUserSessionsUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepository: ISessionsRepository,
  ) {}
  async execute(id: string) {
    return await this.sessionsRepository.findUserSessions(id);
  }
}
