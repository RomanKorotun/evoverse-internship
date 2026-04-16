import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import { UsersRepository } from '../infrastructure/repositories/users.repository';
import { FilesRepository } from '../../file/infrastructure/repositories/files.repository';


@Injectable()
export class UpdateUserQuotaUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly filesRepository: FilesRepository,
  ) {}

  async execute(userId: string, quota: number) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const usedBytes = await this.filesRepository.getUserUsedSize(userId);

    if (quota < usedBytes) {
      throw new BadRequestException(
        "Ліміт сховища не може бути меншим за обсяг існуючих файлів",
      );
    }

    user.quota = quota;

    return await this.usersRepository.update(user);
  }
}