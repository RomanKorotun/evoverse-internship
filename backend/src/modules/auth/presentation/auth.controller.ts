import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { SigninDto } from './dto/signin.dto';
import { SigninUseCase } from '../application/signin/signin.usecase';
import { MeUseCase } from '../application/me/me.usecase';
import type { AuthRequest } from '../../../common/types/auth-request';
import { SignoutUseCase } from '../application/signout/signout.usecase';
import { JwtAuthGuard } from '../../../common/security/guards/jwt-auth.guard';
import { AuthCookieService } from './services/auth-cookie-service';
import { UserMapper } from '../../user/presentation/mappers/user.mapper';
import { RequestMetadataService } from './services/request-metadata.service';
import { FindUserSessionsUseCase } from '../application/find-user-sessions/find-user-sessions.usecase';
import { SessionMapper } from './mappers/session.mapper';
import { RevokeSessionUseCase } from '../application/revoke-session/revoke-session.usecase';
import { RevokeAllSessionsUseCase } from '../application/revoke-all-sessions/revoke-all-sessions.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly signinUseCase: SigninUseCase,
    private readonly meUseCase: MeUseCase,
    private readonly signoutUseCase: SignoutUseCase,
    private readonly authCookieService: AuthCookieService,
    private readonly requestMetadataService: RequestMetadataService,
    private readonly findUserSessionsUseCase: FindUserSessionsUseCase,
    private readonly sessionMapper: SessionMapper,
    private readonly revokeSessionUseCase: RevokeSessionUseCase,
    private readonly revokeAllSessionsUseCase: RevokeAllSessionsUseCase,
  ) {}

  // Авторизація користувача: перевіряє дані, створює сесію та виставляє куку з токеном
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(
    @Body() dto: SigninDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { ip, device } = this.requestMetadataService.getMetadata(req);
    const { user, accessToken } = await this.signinUseCase.execute({
      ...dto,
      ip,
      device,
    });
    this.authCookieService.setAuthCookie(res, accessToken);
    return this.userMapper.toResponse(user);
  }

  // Отримати дані поточного користувача
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: AuthRequest) {
    const user = await this.meUseCase.execute(req.user.id);
    return this.userMapper.toResponse(user);
  }

  // Отримання всіх активних сесій поточного користувача (по userId з JWT)
  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  async getSessions(@Req() req: AuthRequest) {
    const sessions = await this.findUserSessionsUseCase.execute(req.user.id);
    return sessions.map((session) => ({
      ...this.sessionMapper.toResponse(session),
      isCurrent: session.id === req.user.sessionId,
    }));
  }

  // Видалення однієї конкретної сесії користувача
  @UseGuards(JwtAuthGuard)
  @Delete('sessions/:id/revoke')
  async revokeSession(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.revokeSessionUseCase.execute({
      sessionId: id,
      userId: req.user.id,
    });
  }

  // Видалити всі сесії поточного користувача (logout з усіх пристроїв)
  @UseGuards(JwtAuthGuard)
  @Delete('sessions/revoke-all')
  async revokeAllSessions(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.revokeAllSessionsUseCase.execute(req.user.id);
    this.authCookieService.clearAuthCookie(res);
    return result;
  }

  // Вихід із системи: видаляє сесію користувача та очищає куку з токеном
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  async signout(
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.signoutUseCase.execute({
      sessionId: req.user.sessionId,
      userId: req.user.id,
    });
    this.authCookieService.clearAuthCookie(res);
    return response;
  }
}
