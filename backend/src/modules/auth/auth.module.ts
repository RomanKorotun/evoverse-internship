import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { SigninUseCase } from './application/signin/signin.usecase';
import { SecurityModule } from '../../common/security/security.module';
import { AuthController } from './presentation/auth.controller';
import { SessionsJsonRepository } from './infrastructure/repositories/session.repository';
import { MeUseCase } from './application/me/me.usecase';
import { SignoutUseCase } from './application/signout/signout.usecase';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthCookieService } from './presentation/services/auth-cookie-service';
import { RequestMetadataService } from './presentation/services/request-metadata.service';
import { FindUserSessionsUseCase } from './application/find-user-sessions/find-user-sessions.usecase';
import { SessionMapper } from './presentation/mappers/session.mapper';
import { RevokeSessionUseCase } from './application/revoke-session/revoke-session.usecase';
import { RevokeAllSessionsUseCase } from './application/revoke-all-sessions/revoke-all-sessions.usecase';

@Module({
  imports: [SecurityModule, UserModule],
  controllers: [AuthController],
  providers: [
    SigninUseCase,
    MeUseCase,
    SignoutUseCase,
    JwtStrategy,
    AuthCookieService,
    RequestMetadataService,
    FindUserSessionsUseCase,
    SessionMapper,
    RevokeSessionUseCase,
    RevokeAllSessionsUseCase,
    { provide: 'ISessionsRepository', useClass: SessionsJsonRepository },
  ],
})
export class AuthModule {}
