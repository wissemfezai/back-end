import { Module } from '@nestjs/common';
import { MinioClientService } from '../service/minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { config } from '../config';

@Module({
  imports: [
    MinioModule.register({
      endPoint: config.get('MINIO_ENDPOINT'),
      port: parseInt(config.get('MINIO_PORT')),
      useSSL: false,
      accessKey: config.get('MINIO_ACCESS_KEY'),
      secretKey: config.get('MINIO_SECRET_KEY'),
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule { }