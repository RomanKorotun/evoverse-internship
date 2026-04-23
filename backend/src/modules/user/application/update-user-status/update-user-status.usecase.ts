import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { IUsersRepository } from '../../domain/repositories/user.repository';
import { UpdateUserStatusCommand } from './update-user-status.command';

@Injectable()
export class UpdateUserStatus {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}
  async execute(data: UpdateUserStatusCommand) {
    const user = await this.usersRepository.updateStatus(data);
    if (!user) {
      throw new NotFoundException('Користувача не знайдено');
    }
    return user;
  }
}
