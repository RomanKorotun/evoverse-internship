import { ConflictException, Inject, Injectable } from '@nestjs/common';

import type { IUsersRepository } from '../../domain/repositories/user.repository';
import type { CreateUserCommand } from './create-user.command';
import { UserRole } from '../../domain/enums/user-role.enum';
import { PasswordHashService } from '../../../../common/security/services/password-hash.service';
import { UserStatus } from '../../domain/enums/user-status.enum';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    const exists = await this.usersRepository.findByEmail(command.email);

    if (exists) {
      throw new ConflictException(
        `User with email ${command.email} already exists`,
      );
    }

    const hashedPassword = await this.passwordHashService.hash(
      command.password,
    );

    return await this.usersRepository.createUser({
      email: command.email,
      password: hashedPassword,
      quota: command.quota,
      role: command.role ?? UserRole.USER,
      status: UserStatus.ACTIVE,
    });
  }
}
