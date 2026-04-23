import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { SignoutResponse } from './signout.response';
import type { ISessionsRepository } from '../../domain/repositories/session.repository';
import { SignoutCommand } from './signout.command';

@Injectable()
export class SignoutUseCase {
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepository: ISessionsRepository,
  ) {}
  async execute(command: SignoutCommand): Promise<SignoutResponse> {
    const session = await this.sessionsRepository.deleteByIdAndUserId(command);

    if (!session) {
      throw new UnauthorizedException();
    }

    return { message: 'Signout success' };
  }
}
