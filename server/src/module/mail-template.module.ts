import { Module } from '@nestjs/common';
import { MailTemplateService } from '../service/mail-template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailTemplateRepository } from '../repository/mail-template.repository';
import { MailTemplateController } from '../web/rest/mail-template.controller';
import { LogModule } from './log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MailTemplateRepository], "mongo"),
    LogModule
  ],
  controllers: [MailTemplateController],
  providers: [MailTemplateService],
  exports: [MailTemplateService],
})
export class MailTemplateModule { }
