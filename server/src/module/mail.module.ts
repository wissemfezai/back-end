import { Module } from '@nestjs/common';
import { MailService } from '../service/mail.service';
import { MailSettingModule } from './mail-setting.module';
import { MailTemplateModule } from './mail-template.module';

@Module({
  imports: [
    MailSettingModule,
    MailTemplateModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
