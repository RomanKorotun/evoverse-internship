import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { SignupDto } from './dto/signup.dto';
import { UpdateQuotaDto } from './dto/update-quota.dto';
import { SignupUseCase } from '../application/signup-usecase';
import { FindAllUseCase } from '../application/find-all-users-usecase';
import { FindByIdUseCase } from '../application/find-by-id-usecase';
import { UpdateUserQuotaUseCase } from '../application/update-quota-usecase';
import { AuthGuard } from '../../auth/auth.guard';
import type { AuthRequest } from '../../../common/types/auth-request';

@Controller('users')
export class UserController {
  constructor(
    private readonly signupUseCase: SignupUseCase,
    private readonly findAllUseCase: FindAllUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly updateQuotaUseCase: UpdateUserQuotaUseCase,
  ) {}

  // реєстрація користувача
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return await this.signupUseCase.execute(dto);
  }

  // отримання всіх користувачів
  @Get()
  async findAll() {
    return await this.findAllUseCase.execute();
  }

  // отримання одного користувача
  @UseGuards(AuthGuard)
  @Get('profile')
  async findById(@Req() req: AuthRequest) {
    return await this.findByIdUseCase.execute(req.user.id);
  }

  // зміна квоти користувача
  @UseGuards(AuthGuard)
  @Patch('quota')
  async updateQuota(@Req() req: AuthRequest, @Body() dto: UpdateQuotaDto) {
    return await this.updateQuotaUseCase.execute(req.user.id, dto.quota);
  }
}
