import { forwardRef, Module } from '@nestjs/common';

import { SignupUseCase } from './application/signup-usecase';
import { FindAllUseCase } from './application/find-all-users-usecase';
import { FindByIdUseCase } from './application/find-by-id-usecase';
import { UsersRepository } from './infrastructure/repositories/users.repository';
import { UpdateUserQuotaUseCase } from './application/update-quota-usecase';
import { AuthModule } from '../auth/auth.module';
import { FileModule } from '../file/file.module';
import { UserController } from './presentation/user.controller';
import { UsersService } from './application/users.service';

@Module({
  imports: [forwardRef(() => AuthModule), FileModule],
  controllers: [UserController],
  providers: [
    SignupUseCase,
    FindAllUseCase,
    FindByIdUseCase,
    UpdateUserQuotaUseCase,
    UsersRepository,
    UsersService,
  ],
  exports: [UsersRepository, UsersService],
})
export class UserModule {}
