import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { IUsersRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}
  async execute(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Користувача не знайдено`);
    }
    return user;
  }
}
