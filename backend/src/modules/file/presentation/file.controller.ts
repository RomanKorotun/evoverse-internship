import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';

import { CreateFileUseCase } from '../application/create-file-usecase';
import { FindAllFilesUseCase } from '../application/find-all-files-usecase';
import type { AuthRequest } from '../../../common/types/auth-request';
import { RemoveByIdUseCase } from '../application/remove-by-id-usecase';
import { DownloadFileUseCase } from '../application/dowload-file-usecase';
import { GetStorageInfoUseCase } from '../application/get-storage-info-usecase';
import { AuthGuard } from '../../auth/auth.guard';
import { ViewFileUseCase } from '../application/view-file-usecase';

// @UseGuards(AuthGuard)
@Controller('files')
export class FileController {
  constructor(
    private readonly createFileUseCase: CreateFileUseCase,
    private readonly findAllFilesUseCase: FindAllFilesUseCase,
    private readonly removeByIdUseCase: RemoveByIdUseCase,
    private readonly downloadFileUseCase: DownloadFileUseCase,
    private readonly getStorageInfoUseCase: GetStorageInfoUseCase,
    private readonly viewFileUseCase: ViewFileUseCase,
  ) {}

  // завантажити файл для поточного користувача
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req: AuthRequest) {
    return await this.createFileUseCase.execute(req.user, req);
  }

  // отримати список файлів поточного користувача
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.findAllFilesUseCase.execute(req.user.id);
  }

  // видалити файл поточного користувача
  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeById(@Param('id') id: string, @Req() req: AuthRequest) {
    return await this.removeByIdUseCase.execute(id, req.user.id);
  }

  // перегляд конкретного файла
  @Get(':id/:userId/view')
  async viewFile(@Param('id') id: string, @Param('userId') userId: string, @Req() req: AuthRequest) {
    const range = req.headers.range as string | undefined;

    const file = await this.viewFileUseCase.execute(id, userId, range);

    return new StreamableFile(file.stream, {
      type: file.mimeType,
      disposition: `inline; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
    });
  }

  // завантажити файл поточного користувача
  @UseGuards(AuthGuard)
  @Get(':id/download')
  async downloadFile(@Param('id') id: string, @Req() req: AuthRequest) {
    const file = await this.downloadFileUseCase.execute(id, req.user.id);
    return new StreamableFile(file.stream, {
      type: file.mimeType,
      disposition: `attachment; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
    });
  }

  // отримати інформацію про файлове сховище користувача
  @UseGuards(AuthGuard)
  @Get('storage/summary')
  async getStorageInfo(@Req() req: AuthRequest) {
    return await this.getStorageInfoUseCase.execute(req.user);
  }
}
