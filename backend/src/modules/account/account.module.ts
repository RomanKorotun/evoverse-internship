import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { FileModule } from '../file/file.module';
import { DeleteUserAccountUseCase } from './application/delete-user-account-usecase';
import { AuthModule } from '../auth/auth.module';
import { AccountController } from './presentation/account.controller';

@Module({
  imports: [UserModule, FileModule, AuthModule],
  controllers: [AccountController],
  providers: [DeleteUserAccountUseCase],
})
export class AccountModule {}
