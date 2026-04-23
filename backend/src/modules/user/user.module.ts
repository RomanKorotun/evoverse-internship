import { Module } from '@nestjs/common';

import { CreateUserUseCase } from './application/create-user/create-user.usecase';
import { UsersJsonRepository } from './infrastructure/repositories/users.repository';
import { UpdateUserQuotaUseCase } from './application/update-user-quota/update-user-quota-usecase';
import { UserController } from './presentation/user.controller';
import { SecurityModule } from '../../common/security/security.module';
import { FindUserByEmailUseCase } from './application/find-user-by-email/find-user-by-email.usecase';
import { FindUserByIdUseCase } from './application/find-user-by-id/find-user-by-id.usecase';
import { FindAllUsersUseCase } from './application/find-all-users/find-all-users.usecase';
import { UpdateUserStatus } from './application/update-user-status/update-user-status.usecase';
import { UserMapper } from './presentation/mappers/user.mapper';

@Module({
  imports: [SecurityModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    FindUserByEmailUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
    UpdateUserQuotaUseCase,
    UpdateUserStatus,
    UpdateUserQuotaUseCase,
    UserMapper,
    { provide: 'IUsersRepository', useClass: UsersJsonRepository },
  ],
  exports: [
    CreateUserUseCase,
    FindUserByEmailUseCase,
    FindUserByIdUseCase,
    FindAllUsersUseCase,
    UpdateUserStatus,
    UpdateUserQuotaUseCase,
    UserMapper,
  ],
})
export class UserModule {}
