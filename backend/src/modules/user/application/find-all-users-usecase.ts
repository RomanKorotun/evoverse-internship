import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../infrastructure/repositories/users.repository';

@Injectable()
export class FindAllUseCase {
  constructor(private readonly userRepository: UsersRepository) {}
  async execute() {
    return this.userRepository.findAll();
  }
}
