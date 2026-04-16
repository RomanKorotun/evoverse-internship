import { Transform } from 'stream';
import { Logger, PayloadTooLargeException } from '@nestjs/common';

export class LimitStream extends Transform {
  public size = 0;
  public chunkIndex = 0;

  constructor(
    private readonly limit: number,
    private readonly logger: Logger,
    private readonly fileName: string,
  ) {
    super();
  }

  _transform(chunk: Buffer, _: BufferEncoding, cb: Function) {
    this.chunkIndex++;
    this.size += chunk.length;

    const uploadedMB = this.size / 1024 / 1024;
    const chunkKB = chunk.length / 1024;

    const limitMB = this.limit / 1024 / 1024;

    const uploadedMBStr = uploadedMB.toFixed(2);
    const chunkKBStr = chunkKB.toFixed(1);
    const limitMBStr = limitMB.toFixed(2);

    this.logger.debug(
      `[UPLOAD] file=${this.fileName} chunk=#${this.chunkIndex} ${chunkKBStr}KB uploaded=${uploadedMBStr}MB`,
    );

    if (this.size > this.limit) {
      this.logger.error(
        `[UPLOAD STOP] file=${this.fileName} exceeded limit=${limitMBStr}MB`,
      );

      return cb(new PayloadTooLargeException('Quota exceeded'));
    }

    cb(null, chunk);
  }
}
