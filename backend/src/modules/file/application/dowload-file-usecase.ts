// import { ForbiddenException, Injectable } from '@nestjs/common';

// import { FilesRepository } from '../infrastructure/repositories/files.repository';
// import { FileStorage } from '../infrastructure/storage/files-storage';

// @Injectable()
// export class DownloadFileUseCase {
//   constructor(
//     private readonly fileRepository: FilesRepository,
//     private readonly storage: FileStorage,
//   ) {}

//   async execute(fileId: string, userId: string) {
//     const fileMeta = await this.fileRepository.findById(fileId);

//     if (!fileMeta) {
//       throw new ForbiddenException();
//     }

//     if (fileMeta.userId !== userId) {
//       throw new ForbiddenException();
//     }

//     const fileStream = await this.storage.getFileStream(fileMeta.filename);

//     return {
//       stream: fileStream.stream,
//       size: fileStream.size,
//       mimeType: fileStream.mimeType,
//       filename: fileMeta.filename,
//     };
//   }
// }

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

    if (!fileMeta) {
      throw new ForbiddenException();
    }

    if (fileMeta.userId !== userId) {
      throw new ForbiddenException();
    }

    const fileStream = await this.storage.getFileStream(fileMeta.filename);

    return {
      stream: fileStream.stream,
      size: fileStream.meta.size,
      mimeType: fileStream.meta.mimeType,
      filename: fileStream.meta.filename,
    };
  }
}
