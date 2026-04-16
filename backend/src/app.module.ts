import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, FileModule, AccountModule, AuthModule],
})
export class AppModule {}
