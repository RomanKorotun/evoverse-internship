import { Controller, Delete, Req, UseGuards } from '@nestjs/common';

import { DeleteUserAccountUseCase } from '../application/delete-user-account-usecase';
import { AuthGuard } from '../../auth/auth.guard';
import type { AuthRequest } from '../../../common/types/auth-request';

@UseGuards(AuthGuard)
@Controller('accounts')
export class AccountController {
  constructor(
    private readonly deleteUserAccountUseCase: DeleteUserAccountUseCase,
  ) {}

  // видалення користувача з усіма файлами і очищенням сторейджа
  @Delete('remove')
  async delete(@Req() req: AuthRequest) {
    return await this.deleteUserAccountUseCase.execute(req.user.id);
  }
}
