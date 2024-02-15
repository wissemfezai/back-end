import { Module } from '@nestjs/common';
import { MailSettingService } from '../service/mail-setting.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailSettingRepository } from '../repository/mail-setting.repository';
import { MailSettingController } from '../web/rest/mail-setting.controller';
import { LogModule } from './log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MailSettingRepository]),
    LogModule
  ],
  controllers: [MailSettingController],
  providers: [MailSettingService],
  exports: [MailSettingService],
})
export class MailSettingModule { }
