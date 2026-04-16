import { Injectable } from '@nestjs/common';

import { UsersRepository } from '../infrastructure/repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}

  async findByEmail(email: string) {
    return await this.repo.findByEmail(email);
  }
}
