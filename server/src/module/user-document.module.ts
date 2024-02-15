import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { UserDocumentController } from '../web/rest/user-document.controller';
import { UserDocumentRepository } from '../repository/user-document.repository';
import { UserDocumentService } from '../service/user-document.service';
import { LogModule } from './log.module';
import { MinioClientModule } from './minio-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDocumentRepository]),
    LogModule,
    MinioClientModule
  ],

  controllers: [
    //UserDocumentController
  ],

  providers: [UserDocumentService],

  exports: [UserDocumentService]
})
export class UserDocumentModule { }
