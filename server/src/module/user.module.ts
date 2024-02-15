import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../web/rest/user.controller';
import { ManagementController } from '../web/rest/management.controller';
import { UserRepository } from '../repository/user.repository';
import { UserService } from '../service/user.service';
import { LogModule } from './log.module';
import { MailModule } from './mail.module';
import { UserLogModule } from './user-log.module';
import { UserDocumentModule } from './user-document.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    LogModule,
    UserLogModule,
    UserDocumentModule,
    MailModule
  ],

  controllers: [UserController, ManagementController],

  providers: [UserService],

  exports: [UserService]
})
export class UserModule { }
