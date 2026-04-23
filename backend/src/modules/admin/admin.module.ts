import { Module } from '@nestjs/common';

import { GetAllUsersUseCase } from './application/get-all-users/get-all-users.usecase';
import { AdminController } from './presentation/admin.controller';
import { SecurityModule } from '../../common/security/security.module';
import { UserModule } from '../user/user.module';
import { ChangeUserQuotaUseCase } from './application/change-user-quota/change-user.quota';
import { ChangeUserStatusUseCase } from './application/change-user-status/change-user-status.usecase';

@Module({
  imports: [SecurityModule, UserModule],
  controllers: [AdminController],
  providers: [
    GetAllUsersUseCase,
    ChangeUserQuotaUseCase,
    ChangeUserStatusUseCase,
  ],
})
export class AdminModule {}
