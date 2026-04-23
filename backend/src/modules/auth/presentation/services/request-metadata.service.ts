import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import DeviceDetector from 'device-detector-js';

const detector = new DeviceDetector();

@Injectable()
export class RequestMetadataService {
  getMetadata(req: Request) {
    return {
      ip: this.getIp(req),
      device: this.getDevice(req),
    };
  }

  private getIp(req: Request): string {
    const xForwardedFor = req.headers['x-forwarded-for'];

    const ip =
      typeof xForwardedFor === 'string'
        ? xForwardedFor.split(',')[0]
        : req.ip || req.socket?.remoteAddress || '';

    return ip.replace('::ffff:', '');
  }

  private getDevice(req: Request) {
    const { client, os, device } = detector.parse(
      req.headers['user-agent'] || '',
    );

    return {
      browser: client?.name || 'unknown',
      os: os?.name || 'unknown',
      type: device?.type || 'desktop',
    };
  }
}
