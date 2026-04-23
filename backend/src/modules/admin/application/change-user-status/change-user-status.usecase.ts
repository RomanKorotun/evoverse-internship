import { Injectable } from '@nestjs/common';

import { UpdateUserStatus } from '../../../user/application/update-user-status/update-user-status.usecase';
import { ChangeUserStatusCommand } from './change-user-status.command';

@Injectable()
export class ChangeUserStatusUseCase {
  constructor(private readonly updateUserStatus: UpdateUserStatus) {}

  async execute(data: ChangeUserStatusCommand) {
    return await this.updateUserStatus.execute(data);
  }
}
