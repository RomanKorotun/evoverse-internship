import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import type { IUsersRepository } from '../../domain/repositories/user.repository';
import { UpdateUserQuotaCommand } from './update-user-quota.command';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class UpdateUserQuotaUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(data: UpdateUserQuotaCommand): Promise<UserEntity> {
    const user = await this.usersRepository.updateQuota(data);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    return user;
  }
}
