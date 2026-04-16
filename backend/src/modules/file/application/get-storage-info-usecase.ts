import { Injectable } from '@nestjs/common';

import { FilesRepository } from '../infrastructure/repositories/files.repository';
import { UserEntity } from '../../user/domain/entities/user.entity';

@Injectable()
export class GetStorageInfoUseCase {
  constructor(private readonly fileRepository: FilesRepository) {}

  async execute(user: UserEntity) {
    const stats = await this.fileRepository.getUserStorageStats(user.id);

    return {
      quota: user.quota,
      usedBytes: stats.usedBytes,
      filesCount: stats.filesCount,
    };
  }
}
