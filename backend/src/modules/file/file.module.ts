import { Module } from '@nestjs/common';

import { FilesRepository } from './infrastructure/repositories/files.repository';
import { CreateFileUseCase } from './application/create-file/create-file-usecase';
import { FileStorage } from './infrastructure/storage/files-storage';
import { FindAllFilesUseCase } from './application/find-all-files/find-all-files-usecase';
import { RemoveByIdUseCase } from './application/remove-by-id/remove-by-id-usecase';
import { GetStorageInfoUseCase } from './application/get-storage-info/get-storage-info-usecase';
import { ViewFileUseCase } from './application/view-file/view-file-usecase';
import { FileController } from './presentation/file.controller';
import { UserModule } from '../user/user.module';
import { DownloadFileUseCase } from './application/dowload-file/dowload-file-usecase';

@Module({
  imports: [UserModule],
  controllers: [FileController],
  providers: [
    CreateFileUseCase,
    FindAllFilesUseCase,
    RemoveByIdUseCase,
    DownloadFileUseCase,
    ViewFileUseCase,
    GetStorageInfoUseCase,
    { provide: 'IFilesRepository', useClass: FilesRepository },
    FileStorage,
  ],
})
export class FileModule {}
