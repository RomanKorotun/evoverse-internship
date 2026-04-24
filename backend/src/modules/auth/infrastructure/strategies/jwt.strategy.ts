import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TokenHashService } from '../../../../common/security/services/token-hash.service';
import type { ISessionsRepository } from '../../domain/repositories/session.repository';
import { FindUserByIdUseCase } from '../../../user/application/find-user-by-id/find-user-by-id.usecase';
import { UserStatus } from '../../../user/domain/enums/user-status.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject('ISessionsRepository')
    private readonly sessionsRepository: ISessionsRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly tokenHashService: TokenHashService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.accessToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('ACCESS_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const tokenHash = this.tokenHashService.hash(token);

    const session = await this.sessionsRepository.findByTokenHash(tokenHash);

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    const user = await this.findUserByIdUseCase.execute(payload.id);

    if (user.status === UserStatus.BLOCKED) {
      throw new ForbiddenException({
        message: 'Користувач заблокований',
        code: 'USER_BLOCKED',
      });
    }

    return {
      id: user.id,
      role: user.role,
      sessionId: session.id,
    };
  }
}
