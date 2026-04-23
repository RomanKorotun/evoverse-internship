import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Roles } from '../../../common/security/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/security/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/security/guards/roles.guard';
import { UserRole } from '../../user/domain/enums/user-role.enum';
import { GetAllUsersUseCase } from '../application/get-all-users/get-all-users.usecase';
import { UserMapper } from '../../user/presentation/mappers/user.mapper';
import { ChangeUserQuotaDto } from './dto/change-user-quota.dto';
import { ChangeUserQuotaUseCase } from '../application/change-user-quota/change-user.quota';
import type { AuthRequest } from '../../../common/types/auth-request';
import { ChangeUserStatusDto } from './dto/change-user-status.dto';
import { ChangeUserStatusUseCase } from '../application/change-user-status/change-user-status.usecase';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly changeUserQuotaUseCase: ChangeUserQuotaUseCase,
    private readonly changeUserStatusUseCase: ChangeUserStatusUseCase,
  ) {}

  // Отримання списку всіх користувачів (доступно лише для адміністратора)
  @Get('users')
  async getdAllUsers(@Req() req: AuthRequest) {
    const users = await this.getAllUsersUseCase.execute();
    return users.map((user) => this.userMapper.toResponse(user));
  }

  // керує статусом користувача - блокує або розблоковує (доступно лише для адміністратора)
  @Patch('users/:id/status')
  async blockUser(@Param('id') id: string, @Body() dto: ChangeUserStatusDto) {
    const user = await this.changeUserStatusUseCase.execute({
      userId: id,
      status: dto.status,
    });
    return this.userMapper.toResponse(user);
  }

  // зміна квоти користувача (доступно лише для адміністратора)
  @Patch('users/:id/quota')
  async changeUserQuota(
    @Param('id') id: string,
    @Body() dto: ChangeUserQuotaDto,
  ) {
    const user = await this.changeUserQuotaUseCase.execute({
      userId: id,
      quota: dto.quota,
    });
    return this.userMapper.toResponse(user);
  }
}
