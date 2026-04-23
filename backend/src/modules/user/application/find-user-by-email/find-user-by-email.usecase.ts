import { Inject, Injectable } from '@nestjs/common';

import type { IUsersRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(email: string): Promise<UserEntity | null> {
    return await this.usersRepository.findByEmail(email);
  }
}
