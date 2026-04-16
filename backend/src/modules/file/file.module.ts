import { Module } from '@nestjs/common';

import { FilesRepository } from './infrastructure/repositories/files.repository';
import { CreateFileUseCase } from './application/create-file-usecase';
import { FileStorage } from './infrastructure/storage/files-storage';
import { FindAllFilesUseCase } from './application/find-all-files-usecase';
import { RemoveByIdUseCase } from './application/remove-by-id-usecase';
import { DownloadFileUseCase } from './application/dowload-file-usecase';
import { GetStorageInfoUseCase } from './application/get-storage-info-usecase';
import { AuthModule } from '../auth/auth.module';
import { ViewFileUseCase } from './application/view-file-usecase';
import { FileController } from './presentation/file.controller';

@Module({
  imports: [AuthModule],
  controllers: [FileController],
  providers: [
    CreateFileUseCase,
    FindAllFilesUseCase,
    RemoveByIdUseCase,
    DownloadFileUseCase,
    ViewFileUseCase,
    GetStorageInfoUseCase,
    FilesRepository,
    FileStorage,
  ],
  exports: [FileStorage, FilesRepository],
})
export class FileModule {}
