import { Inject, Injectable } from '@nestjs/common';
import type { ISessionsRepository } from '../../domain/repositories/session.repository';

@Injectable()
export class RevokeAllSessionsUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepository: ISessionsRepository,
  ) {}
  async execute(userId: string): Promise<number> {
    return this.sessionsRepository.deleteAllByUserId(userId);
  }
}
