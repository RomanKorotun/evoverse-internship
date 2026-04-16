import { ForbiddenException, Injectable } from '@nestjs/common';

import { FilesRepository } from '../infrastructure/repositories/files.repository';
import { FileStorage } from '../infrastructure/storage/files-storage';

@Injectable()
export class DownloadFileUseCase {
  constructor(
    private readonly fileRepository: FilesRepository,
    private readonly storage: FileStorage,
  ) {}

  async execute(fileId: string, userId: string) {
    const fileMeta = await this.fileRepository.findById(fileId);

    if (!fileMeta) throw new ForbiddenException();
    if (fileMeta.userId !== userId) throw new ForbiddenException();

    const file = await this.storage.getFileStream(
      fileMeta.filename,
      undefined,
      'attachment',
    );

    return {
      stream: file.stream,
      headers: file.headers,
      statusCode: file.statusCode,
      filename: fileMeta.filename,
      mimeType: file.headers['Content-Type'],
    };
  }
}
