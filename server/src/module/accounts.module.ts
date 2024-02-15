import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from '../web/rest/accounts.controller';
import { AccountsRepository } from '../repository/accounts.repository';
import { AccountsService } from '../service/accounts.service';
import { HttpModule } from '@nestjs/axios';
import { XmljsUtils } from '../utils/xmljs.utils';

@Module({
  imports: [TypeOrmModule.forFeature([AccountsRepository]) , HttpModule ],
  controllers: [AccountsController],
  providers: [AccountsService , XmljsUtils],
  exports: [AccountsService , XmljsUtils]
})
export class AccountsModule {}