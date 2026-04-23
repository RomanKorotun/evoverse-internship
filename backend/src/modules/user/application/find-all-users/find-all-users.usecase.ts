import { Inject, Injectable } from '@nestjs/common';

import type { IUsersRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class FindAllUsersUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<UserEntity[]> {
    return await this.usersRepository.findAllUsersOnly();
  }
}
