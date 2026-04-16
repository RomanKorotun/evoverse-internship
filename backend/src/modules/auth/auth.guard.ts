import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const email = req.headers['x-email'];
    const password = req.headers['x-password'];

    const user = await this.authService.validate(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    req.user = user;

    return true;
  }
}
