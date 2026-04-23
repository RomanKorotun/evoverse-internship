import { Injectable } from '@nestjs/common';

import { UpdateUserQuotaUseCase } from '../../../user/application/update-user-quota/update-user-quota-usecase';
import { ChangeUserQuotaCommand } from './change-user-quota.command';

@Injectable()
export class ChangeUserQuotaUseCase {
  constructor(private readonly updateUserQuotaUseCas: UpdateUserQuotaUseCase) {}

  async execute(data: ChangeUserQuotaCommand) {
    return await this.updateUserQuotaUseCas.execute(data);
  }
}
