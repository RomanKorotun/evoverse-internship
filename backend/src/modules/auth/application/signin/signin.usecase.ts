import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { SigninCommand } from './signin.command';
import { SigninResponse } from './signin.response';
import { FindUserByEmailUseCase } from '../../../user/application/find-user-by-email/find-user-by-email.usecase';
import { PasswordHashService } from '../../../../common/security/services/password-hash.service';
import { TokenService } from '../../../../common/security/services/token.service';
import type { ISessionsRepository } from '../../domain/repositories/session.repository';
import { TokenHashService } from '../../../../common/security/services/token-hash.service';
import { UserStatus } from '../../../user/domain/enums/user-status.enum';

@Injectable()
export class SigninUseCase {
  private readonly logger = new Logger(SigninUseCase.name);
  constructor(
    @Inject('ISessionsRepository')
    private readonly sessionsRepository: ISessionsRepository,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
    private readonly passwordHashService: PasswordHashService,
    private readonly tokenService: TokenService,
    private readonly tokenHashService: TokenHashService,
  ) {}
  async execute(command: SigninCommand): Promise<SigninResponse> {
    const user = await this.findUserByEmailUseCase.execute(command.email);

    if (!user) {
      throw new UnauthorizedException('Email або password не вірні');
    }

    const passwordCompare = await this.passwordHashService.compare(
      command.password,
      user.password,
    );

    if (!passwordCompare) {
      throw new UnauthorizedException('Email або password не вірні');
    }

    if (user.status === UserStatus.BLOCKED) {
      throw new ForbiddenException({
        message: 'Користувач заблокований',
        code: 'USER_BLOCKED',
        status: UserStatus.BLOCKED,
      });
    }

    const accessToken = this.tokenService.generate(user.id, user.role);

    const hashedAccessToken = this.tokenHashService.hash(accessToken);

    await this.sessionsRepository.createSession({
      userId: user.id,
      tokenHash: hashedAccessToken,
      ip: command.ip,
      device: command.device,
    });

    return { user, accessToken };
  }
}
