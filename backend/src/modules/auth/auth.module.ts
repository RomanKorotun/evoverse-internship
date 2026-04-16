import { forwardRef, Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
