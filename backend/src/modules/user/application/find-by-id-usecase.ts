import { Injectable, NotFoundException } from '@nestjs/common';

import { UsersRepository } from '../infrastructure/repositories/users.repository';

@Injectable()
export class FindByIdUseCase {
  constructor(private readonly userRepository: UsersRepository) {}
  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new NotFoundException(`Користувача не знайдено`);
    }

    return user;
  }
}
