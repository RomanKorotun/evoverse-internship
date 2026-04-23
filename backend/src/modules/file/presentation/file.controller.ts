import {
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { CreateFileUseCase } from '../application/create-file/create-file-usecase';
import { FindAllFilesUseCase } from '../application/find-all-files/find-all-files-usecase';
import { RemoveByIdUseCase } from '../application/remove-by-id/remove-by-id-usecase';
import { GetStorageInfoUseCase } from '../application/get-storage-info/get-storage-info-usecase';
import { ViewFileUseCase } from '../application/view-file/view-file-usecase';
import type { AuthRequest } from '../../../common/types/auth-request';
import { JwtAuthGuard } from '../../../common/security/guards/jwt-auth.guard';
import { DownloadFileUseCase } from '../application/dowload-file/dowload-file-usecase';

@UseGuards(JwtAuthGuard)
@Controller('files')
export class FileController {
  constructor(
    private readonly createFileUseCase: CreateFileUseCase,
    private readonly findAllFilesUseCase: FindAllFilesUseCase,
    private readonly removeByIdUseCase: RemoveByIdUseCase,
    private readonly getStorageInfoUseCase: GetStorageInfoUseCase,
    private readonly downloadFileUseCase: DownloadFileUseCase,
    private readonly viewFileUseCase: ViewFileUseCase,
  ) {}

  // завантажити файл для поточного користувача
  @Post()
  async create(@Req() req: AuthRequest) {
    return await this.createFileUseCase.execute({ id: req.user.id, req });
  }

  // отримати список файлів поточного користувача
  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.findAllFilesUseCase.execute(req.user.id);
  }

  // // видалити файл поточного користувача
  @Delete(':id')
  async removeById(@Param('id') id: string, @Req() req: AuthRequest) {
    return await this.removeByIdUseCase.execute(id, req.user.id);
  }

  // перегляд конкретного файла
  @Get(':id/view')
  async view(
    @Param('id') fileId: string,
    @Req() req: AuthRequest,
    @Headers('range') range?: string,
  ) {
    const result = await this.viewFileUseCase.execute(
      fileId,
      req.user.id,
      range,
    );
    return new StreamableFile(result.stream, {
      type: result.headers['Content-Type'],
      disposition: result.headers['Content-Disposition'],
    });
  }

  // скачати файл поточного користувача
  @Get(':id/download')
  async downloadFile(
    @Param('id') id: string,
    @Req() req: AuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.downloadFileUseCase.execute(id, req.user.id);
    res.set({
      'Content-Type': file.mimeType,
      'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(file.filename)}`,
    });
    return new StreamableFile(file.stream);
  }

  // // отримати інформацію про файлове сховище користувача
  @Get('storage/summary')
  async getStorageInfo(@Req() req: AuthRequest) {
    return await this.getStorageInfoUseCase.execute(req.user.id);
  }
}
