import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { pipeline } from 'stream/promises';
import Busboy from 'busboy';
import type { Request } from 'express';
import mime from 'mime-types';

import { LimitStream } from '../streams/limit.stream';
import { STORAGE_DIR } from '../../../../common/constants/store.constants';
import { normalizeFilename } from '../../helpers/index';

@Injectable()
export class FileStorage implements OnModuleInit {
  private readonly logger = new Logger(FileStorage.name);

  async onModuleInit() {
    await fsPromises.mkdir(STORAGE_DIR, { recursive: true });
  }

  async upload(req: Request, limitBytes: number) {
    const busboy = Busboy({ headers: req.headers });
    const startTime = Date.now();

    return new Promise<{ filename: string; size: number }>(
      (resolve, reject) => {
        let hasFile = false;

        busboy.on('file', async (_f, file, info) => {
          hasFile = true;

          const name = `${Date.now()}-${normalizeFilename(info.filename)}`;
          const filePath = path.join(STORAGE_DIR, name);

          this.logger.log(`[UPLOAD START] file=${name}`);

          const limit = new LimitStream(limitBytes, this.logger, name);
          const out = fs.createWriteStream(filePath);

          pipeline(file, limit, out)
            .then(() => {
              this.logger.log(
                `[UPLOAD DONE] file=${name} size=${limit.size} time=${Date.now() - startTime}ms`,
              );

              resolve({
                filename: name,
                size: limit.size,
              });
            })
            .catch(async (err: Error) => {
              this.logger.error(
                `[UPLOAD ERROR] file=${name} error=${err.message}`,
              );

              try {
                await fsPromises.unlink(filePath);
              } catch (e) {
                this.logger.error(
                  `[CLEANUP ERROR] ${e instanceof Error ? e.message : String(e)}`,
                );
              }

              reject(err);
            });
        });

        busboy.on('error', reject);

        busboy.on('finish', () => {
          if (!hasFile) {
            reject(new Error('No file uploaded'));
          }
        });

        req.pipe(busboy);
      },
    );
  }

  async getFileStream(
    filename: string,
    range?: string,
    mode: 'inline' | 'attachment' = 'inline',
  ) {
    const filePath = path.join(STORAGE_DIR, filename);

    const stat = await fsPromises.stat(filePath);
    const fileSize = stat.size;

    const mimeType = mime.lookup(filePath) || 'application/octet-stream';

    let start = 0;
    let end = fileSize - 1;

    const isRangeRequest = !!range;

    if (isRangeRequest) {
      const parts = range.replace(/bytes=/, '').split('-');
      start = Number(parts[0]);
      end = parts[1] ? Number(parts[1]) : fileSize - 1;
    }

    const chunkSize = end - start + 1;

    const stream = fs.createReadStream(filePath, { start, end });

    return {
      stream,
      statusCode: isRangeRequest ? 206 : 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': chunkSize,
        'Content-Disposition': `${mode}; filename*=UTF-8''${encodeURIComponent(filename)}`,

        ...(isRangeRequest && {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
        }),
      },
    };
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(STORAGE_DIR, filename);

    try {
      await fsPromises.unlink(filePath);
      this.logger.log(`[FILE REMOVED] ${filename}`);
    } catch (err: unknown) {
      const error = err as NodeJS.ErrnoException;

      if (error.code === 'ENOENT') {
        this.logger.warn(`[FILE NOT FOUND] ${filename}`);
        return;
      }

      this.logger.error(
        `[FILE REMOVE ERROR] ${filename} code=${error.code} message=${error.message}`,
      );

      throw error;
    }
  }
}
