import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { pipeline } from 'stream/promises';
import Busboy from 'busboy';
import type { Request } from 'express';
import mime from 'mime-types';
import { randomUUID } from 'crypto';

import { LimitStream } from '../streams/limit.stream';
import { STORAGE_DIR } from '../../../../constants/store.constants';

@Injectable()
export class FileStorage implements OnModuleInit {
  private readonly logger = new Logger(FileStorage.name);

  async onModuleInit() {
    await fsPromises.mkdir(STORAGE_DIR, { recursive: true });
  }

  async upload(req: Request, limitBytes: number) {
    const busboy = Busboy({ headers: req.headers });

    const startTime = Date.now();
    const uploadId = randomUUID();

    return new Promise<{ filename: string; size: number }>(
      (resolve, reject) => {
        let finished = false;
        let hasFile = false;

        busboy.on('file', async (_field, file, info) => {
          if (finished) return;

          hasFile = true;

          const safeName = info.filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
          const storedName = `${Date.now()}-${safeName}`;

          this.logger.log(`[UPLOAD START] id=${uploadId} file=${storedName}`);

          const limitStream = new LimitStream(
            limitBytes,

            this.logger,
            storedName,
          );

          try {
            await pipeline(
              file,
              limitStream,
              fs.createWriteStream(path.join(STORAGE_DIR, storedName)),
            );

            finished = true;

            const totalTime = Date.now() - startTime;

            this.logger.log(
              `[UPLOAD DONE] id=${uploadId} file=${storedName} size=${limitStream.size} time=${totalTime}ms`,
            );

            resolve({
              filename: storedName,
              size: limitStream.size,
            });
          } catch (err) {
            this.logger.error(
              `[UPLOAD ERROR] id=${uploadId} file=${storedName} error=${(err as Error).message}`,
            );

            reject(err);
          }
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

  async getFileStream(filename: string, range?: string) {
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

        ...(isRangeRequest && {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
        }),
      },
      meta: {
        size: fileSize,
        filename,
        mimeType,
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
