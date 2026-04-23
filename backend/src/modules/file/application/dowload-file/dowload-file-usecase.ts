import { ForbiddenException, Inject, Injectable } from '@nestjs/common';

import { FileStorage } from '../../infrastructure/storage/files-storage';
import type { IFilesRepository } from '../../domain/repositories/files.repository';

@Injectable()
export class DownloadFileUseCase {
  constructor(
    @Inject('IFilesRepository')
    private readonly filesRepository: IFilesRepository,
    private readonly storage: FileStorage,
  ) {}

  async execute(fileId: string, userId: string) {
    const fileMeta = await this.filesRepository.findById(fileId);

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
