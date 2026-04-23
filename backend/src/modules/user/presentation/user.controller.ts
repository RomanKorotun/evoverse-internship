import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from '../application/create-user/create-user.usecase';
import { UserMapper } from './mappers/user.mapper';

@Controller('users')
export class UserController {
  constructor(
    private readonly userMapper: UserMapper,
    private readonly signupUseCase: CreateUserUseCase,
  ) {}

  // Реєстрація нового користувача (створює акаунт)
  @Post('signup')
  async signup(@Body() dto: CreateUserDto) {
    const user = await this.signupUseCase.execute(dto);
    return this.userMapper.toResponse(user);
  }
}
