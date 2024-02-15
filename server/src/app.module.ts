import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './module/auth.module';
import { ormconfig } from './orm.config';
import { UserModule } from './module/user.module';
import { LogModule } from './module/log.module';
import { MailModule } from './module/mail.module';
import { UserLogModule } from './module/user-log.module';
import { MailSettingModule } from './module/mail-setting.module';
import { MailTemplateModule } from './module/mail-template.module';
import { AppGateway } from './web/soket/app.gateway';
import { MinioClientModule } from './module/minio-client.module';
import { UserDocument } from './domain/postgresql/user-document.entity';
import { XmljsUtils } from './utils/xmljs.utils';

import { CustomerModule } from './module/customer.module';
import { VendorModule } from './module/vendor.module';
import { CdrModule } from './module/cdr.module';
import { CallsModule } from './module/calls.module';
import { AccountsModule } from './module/accounts.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig[0]),
    TypeOrmModule.forRoot(ormconfig[1]),
    AuthModule,
    UserModule,
    UserLogModule,
    LogModule,
    MailModule,
    MailSettingModule,
    MailTemplateModule,
    MinioClientModule,
    UserDocument,
    CustomerModule,
    VendorModule,
    CdrModule,
    CallsModule,
    AccountsModule,

    
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    AppGateway,
    XmljsUtils


    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ]
})
export class AppModule {}
