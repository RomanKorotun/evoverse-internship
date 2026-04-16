import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import type { Request } from 'express';

import { UserEntity } from '../../user/domain/entities/user.entity';
import { FileStorage } from '../infrastructure/storage/files-storage';
import { FilesRepository } from '../infrastructure/repositories/files.repository';

@Injectable()
export class CreateFileUseCase {
  constructor(
    private readonly filesRepository: FilesRepository,
    private readonly fileStorage: FileStorage,
  ) {}

  async execute(user: UserEntity, req: Request) {
    const usedBytes = await this.filesRepository.getUserUsedSize(user.id);
    const remainingQuota = user.quota - usedBytes;

    if (remainingQuota <= 0) {
      throw new PayloadTooLargeException('Quota exceeded');
    }

    const file = await this.fileStorage.upload(req, remainingQuota);

    const entity = await this.filesRepository.create({
      userId: user.id,
      filename: file.filename,
      size: file.size,
    });

    return entity;
  }
}
