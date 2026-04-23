import { Inject, Injectable, PayloadTooLargeException } from '@nestjs/common';

import { FileStorage } from '../../infrastructure/storage/files-storage';
import { CreateFileCommand } from './create-file.command';
import { FindUserByIdUseCase } from '../../../user/application/find-user-by-id/find-user-by-id.usecase';
import type { IFilesRepository } from '../../domain/repositories/files.repository';

@Injectable()
export class CreateFileUseCase {
  constructor(
    @Inject('IFilesRepository')
    private readonly filesRepository: IFilesRepository,
    private readonly fileStorage: FileStorage,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
  ) {}

  async execute({ id, req }: CreateFileCommand) {
    const usedBytes = await this.filesRepository.getUserUsedSize(id);
    const user = await this.findUserByIdUseCase.execute(id);
    const remainingQuota = user.quota - usedBytes;

    if (remainingQuota <= 0) {
      throw new PayloadTooLargeException('Quota exceeded');
    }

    const file = await this.fileStorage.upload(req, remainingQuota);
    const entity = await this.filesRepository.saveFileMetadata({
      userId: id,
      filename: file.filename,
      size: file.size,
    });

    return entity;
  }
}
