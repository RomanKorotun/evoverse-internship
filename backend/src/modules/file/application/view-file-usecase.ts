import { Injectable, ForbiddenException } from '@nestjs/common';

import { FilesRepository } from '../infrastructure/repositories/files.repository';
import { FileStorage } from '../infrastructure/storage/files-storage';

@Injectable()
export class ViewFileUseCase {
  constructor(
    private readonly fileRepository: FilesRepository,
    private readonly storage: FileStorage,
  ) {}

  async execute(fileId: string, userId: string, range?: string) {
    const fileMeta = await this.fileRepository.findById(fileId);

    if (!fileMeta) throw new ForbiddenException();
    if (fileMeta.userId !== userId) throw new ForbiddenException();

    const file = await this.storage.getFileStream(
      fileMeta.filename,
      range,
      'inline',
    );

    return {
      stream: file.stream,
      headers: file.headers,
      statusCode: file.statusCode,
    };
  }
}
